import { combineEpics } from 'vuex-rx'
import { epic as adminEpic } from '../containers/admin/Admin.module'
import { epic as searchEpic } from '../containers/search/Search.module'
import { epic as reposEpic } from '../containers/repos/Repos.module'

export default combineEpics(
  adminEpic,
  searchEpic,
  reposEpic,
)
