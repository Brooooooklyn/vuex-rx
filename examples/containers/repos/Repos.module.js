import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs/Observable'
import { createAction, handleActions } from 'vuex-rx'

export const requestReposByUser = createAction('REQUEST_REPOS_BY_USERS')
const receviedReposByUser = createAction('RECEVIED_REPOS_BY_USERS')

const defaultState = {
  reposByUser: []
}

// reducer
export const reducer = handleActions({

  [requestReposByUser]: (state) => {
    return { ...state, reposByUser: [] }
  },

  [receviedReposByUser]: (state, payload) => {
    return { ...state, reposByUser: payload }
  }

}, defaultState)

//epic

export const epic = action$ => action$
  .ofType(`${requestReposByUser}`)
  .map(action => action.payload)
  .switchMap(user =>
    ajax.getJSON(`https://api.github.com/users/${user}/repos`)
      .map(receviedReposByUser)
  )
