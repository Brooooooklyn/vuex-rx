import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs/Observable'
import { createAction, handleActions } from 'vuex-observable'

export const searchUsers = createAction('SEARCHED_USERS')
const receviedUsers = createAction('RECEIVED_USERS')
const clearSearchResults = createAction('CLEARED_SEARCH_RESULTS')

const defaultState = {
  results: []
}

// reducer
export const reducer = handleActions({
  [receviedUsers]: (state, { payload }) => {
    return { ...state, results: payload }
  },
  [clearSearchResults]: (state) => {
    return { ...state, results: [] }
  }
}, defaultState)

//epic

export const epic = action$ => action$
  .ofType(`${searchUsers}`)
  .map(action => action.payload.query)
  .filter(q => !!q)
  .switchMap(q =>
    Observable.timer(800) // debounce
      .takeUntil(action$.ofType(`${clearSearchResults}`))
      .mergeMap(() => Observable.merge(
        Observable.of(replace(`?q=${q}`)),
        ajax.getJSON(`https://api.github.com/search/users?q=${q}`)
          .map(res => res.items)
          .map(receviedUsers)
      ))
  )
