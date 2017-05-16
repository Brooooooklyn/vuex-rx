import { expect } from 'chai'
import * as Vue from 'vue'
import * as vuex from 'vuex'
import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { asap } from 'rxjs/scheduler/asap'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

import {
  createEpicMiddleware,
  Epic,
  combineEpics,
  ActionsObservable,
  actionMutations,
  createAction,
  handleActions
} from '../'

interface State {
  foo: string
}

interface FluxStandardAction {
  type: string | symbol | any
  payload?: any
  error?: boolean | any
  meta?: any
}

const epic1: Epic<FluxStandardAction, State> = (action$, store) =>
  action$.ofType('FIRST')
    .mapTo({
      type: 'first',
      payload: store.state
    })

const epic2: Epic<FluxStandardAction, State> = (action$, store) =>
  action$.ofType('SECOND', 'NEVER')
    .mapTo('second')
    .mergeMap(type => Observable.of({ type }))

const epic3: Epic<FluxStandardAction, State> = action$ =>
  action$.ofType('THIRD')
    .mapTo({
      type: 'third'
    })

const epic4: Epic<FluxStandardAction, State> = () =>
  Observable.of({
    type: 'fourth'
  })

const epic5: Epic<FluxStandardAction, State> = (action$, store) =>
  action$.ofType('FIFTH')
    .mergeMap(({ type, payload }) => Observable.of({
      type: 'fifth',
      payload
    }))

const epic6: Epic<FluxStandardAction, State> = (action$, store) =>
  action$.ofType('SIXTH')
    .map(({ type, payload }) => ({
      type: 'sixth',
      payload
    }))

const rootEpic1: Epic<FluxStandardAction, State> = combineEpics<FluxStandardAction, State>(epic1, epic2, epic3, epic4, epic5, epic6)
const rootEpic2 = combineEpics(epic1, epic2, epic3, epic4, epic5, epic6)

const reducer = handleActions({
  root: (state: Array<FluxStandardAction> = [], action: FluxStandardAction) => state.concat(action)
}, {})

Vue.use(vuex)

const first = createAction('FIRST')
const second = createAction('SECOND')
const fifth = createAction('FIFTH')
const sixth = createAction('SIXTH')

const store = new vuex.Store({
  modules: {
    root: reducer
  },
  mutations: { ...actionMutations }
})

Vue.use(createEpicMiddleware(store), {
  epic: rootEpic2
})

store.commit('FIRST')
store.commit({ type: 'SECOND' })
store.commit({ type: 'FIFTH', payload: 'fifth-payload' })
store.commit({ type: 'SIXTH', payload: 'sixth-payload' })

// tslint:disable-next-line:no-empty
const input$ = Observable.create(() => {})
const action$1: ActionsObservable<FluxStandardAction> = new ActionsObservable<FluxStandardAction>(input$)
const action$2: ActionsObservable<FluxStandardAction> = ActionsObservable.of<FluxStandardAction>({ type: 'SECOND' }, { type: 'FIRST' }, asap)
const action$3: ActionsObservable<FluxStandardAction> = ActionsObservable.from<FluxStandardAction>([{ type: 'SECOND' }, { type: 'FIRST' }], asap)

console.info('typings.ts: OK')
