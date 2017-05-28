import { combineReducers } from 'vuex-rx'
import { reducer as adminReducer } from '../containers/admin/Admin.module'
import { reducer as searchReducer } from '../containers/search/Search.module'
import { reducer as reposReducer } from '../containers/repos/Repos.module'

export default combineReducers({
  admin: adminReducer,
  search: searchReducer,
  repos: reposReducer,
})
