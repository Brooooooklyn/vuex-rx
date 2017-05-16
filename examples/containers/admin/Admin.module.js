import { push } from 'vue-router'
import { Observable } from 'rxjs/Observable'
import { createAction, handleActions, combineEpics } from 'vuex-observable'

export const checkAdminAccess = createAction('CHECKED_ADMIN_ACCESS')
const accessDenied = createAction('ACCESS_DENIED')

// reducer
export const reducer = handleActions({
  [`${accessDenied}`]: (state, { payload }) => {
    return { ...state, adminAccess: payload }
  }
}, {})

// epics

const adminAccess = action$ => action$
  // could do so here then filter by failed checks.
  // If you wanted to do an actual access check you
  .ofType(`${checkAdminAccess}`)
  .delay(2000)
  .mergeMap(() => Observable.merge(
    Observable.of(accessDenied()),
    Observable.timer(2000)
      .map(() => push('/'))
  ))

// or you can just
// export const epic = adminAccess
export const epic = combineEpics(
  adminAccess
)
