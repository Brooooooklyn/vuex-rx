import { combineEpics } from 'vuex-observable'
import { epic as adminEpic } from '../containers/admin/Admin.module'

export default combineEpics(
  adminEpic,
)
