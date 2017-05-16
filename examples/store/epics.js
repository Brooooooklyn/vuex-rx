import { combineEpics } from 'vuex-observable'
import { epic as adminEpic } from '../containers/admin/Admin.module'
import { epic as searchEpic } from '../containers/search/Search.module'

export default combineEpics(
  adminEpic,
  searchEpic,
)
