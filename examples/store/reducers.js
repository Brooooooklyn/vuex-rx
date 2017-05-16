import { combineReducers } from 'vuex-observable'
import { reducer as adminReducer } from '../containers/admin/Admin.module'
import { reducer as searchReducer } from '../containers/search/Search.module'

export default combineReducers({
  admin: adminReducer,
  search: searchReducer,
})
