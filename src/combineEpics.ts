import { merge } from 'rxjs/observable/merge'
import { Epic } from './createEpic'

/**
  Merges all epics into a single one.
 */
export const combineEpics = <A, S>(...epics: Epic<A, S>[]): Epic<A, S> => (...args: any[]) =>
  merge(
    ...epics.map(epic => {
      const output$ = (epic as any)(...args)
      if (!output$) {
        throw new TypeError(
          `combineEpics: one of the provided Epics "${epic.name || '<anonymous>'}" ` +
          `does not return a stream. Double check you\'re not missing a return statement!`
        )
      }
      return output$
    })
  )
