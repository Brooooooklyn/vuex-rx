import { createAction } from '../../dist'

export const SEARCHED_USERS = createAction('SEARCHED_USERS')
export const RECEIVED_USERS = createAction('RECEIVED_USERS')
export const CLEARED_SEARCH_RESULTS = createAction('CLEARED_SEARCH_RESULTS')

export const REQUESTED_USER_REPOS = createAction('REQUESTED_USER_REPOS')
export const RECEIVED_USER_REPOS = createAction('RECEIVED_USER_REPOS')

export const CHECKED_ADMIN_ACCESS = createAction('CHECKED_ADMIN_ACCESS')
export const ACCESS_DENIED = createAction('ACCESS_DENIED')
