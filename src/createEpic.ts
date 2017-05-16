import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Store } from 'vuex'
import Vue from 'vue'

import { ActionsObservable } from './ActionObservable'
import { EPIC_END } from './EPIC_END'

export type Epic<T, S> = (input$: ActionsObservable<T>, store?: Store<S>, dependencies?: any) => Observable<T>

export const defaultAdapter = {
  input: (action$: ActionsObservable<any>) => action$,
  output: (action$: ActionsObservable<any>) => action$
}

const defaultOptions = {
  adapter: defaultAdapter
}

export interface CreateEpicMiddlewareOptions<T, S> {
  adapter?: typeof defaultAdapter
  epic: Epic<T, S>
}

export function createEpicMiddleware <T, S> (store: Store<S>) {
  return (_: typeof Vue, options: CreateEpicMiddlewareOptions<T, S>) => {
    options = { ...defaultOptions, ...options }
    const epic = options.epic

    const input$ = new Subject()

    const action$ = options.adapter!.input(
      new ActionsObservable(input$)
    )

    const epic$ = new Subject<Epic<any, S>>()

    store.subscribe((mutation) => {
      input$.next(mutation)
    })

    epic$.map(epic_ => {
      const output$ = ('dependencies' in options)
        ? epic_(action$, store, (options as any).dependencies)
        : epic_(action$, store)

      if (!output$) {
        throw new TypeError(
          `Your root Epic "${epic_.name || '<anonymous>'}" does not return a stream. Double check you\'re not missing a return statement!`
        )
      }
      return output$
    })
    .switchMap(output$ => options.adapter!.output(output$ as ActionsObservable<T>))
    .subscribe()

    epic$.next(epic)

    return (epic_: Epic<any, S>) => {
      // gives the previous root Epic a last chance
      // to do some clean up
      store.commit({ type: EPIC_END })
      // switches to the new root Epic, synchronously terminating
      // the previous one
      epic$.next(epic_)
    }
  }
}
