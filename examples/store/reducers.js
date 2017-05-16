import { combineReducers } from 'vuex-observable'
import { reducer as adminReducer } from '../components/admin/Admin.module'

export default combineReducers({
  admin: adminReducer
})
