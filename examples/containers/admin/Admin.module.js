import { Observable } from 'rxjs/Observable'
import { createAction, handleActions, combineEpics } from 'vuex-rx'

export const checkAdminAccess = createAction('CHECKED_ADMIN_ACCESS')
const accessDenied = createAction('ACCESS_DENIED')

// reducer
export const reducer = handleActions({
  [`${accessDenied}`]: (state, payload) => {
    return { ...state, adminAccess: payload }
  }
}, {
  adminAccess: null
})

// epics

const adminAccess = action$ => action$
  // could do so here then filter by failed checks.
  // If you wanted to do an actual access check you
  .ofType(`${checkAdminAccess}`)
  .delay(2000)
  .mergeMap(() => Observable.merge(
    Observable.of(accessDenied()),
    Observable.timer(2000)
      .map(() => location.href = '/')
  ))

// or you can just
// export const epic = adminAccess
export const epic = combineEpics(
  adminAccess
)
