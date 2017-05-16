import { createAction, handleActions } from 'vuex-observable'

export const searchUsers = createAction('SEARCHED_USERS')
const receviedUsers = createAction('RECEIVED_USERS')
const clearSearchResults = createAction('CLEARED_SEARCH_RESULTS')

const defaultState = {
  results: []
}

// reducer
export const reducer = handleActions({
  [`${receviedUsers}`]: (state, { payload }) => {
    return { ...state, results: payload }
  }
}, defaultState)
