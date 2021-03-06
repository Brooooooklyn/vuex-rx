import { connect } from 'vuex-rx'
import { checkAdminAccess } from './Admin.module'
import store from '../../store'

const Admin = {
  created() {
    this.checkAdminAccess()
  }
}

export default connect((globalState) => globalState.ui.admin, {
  checkAdminAccess
})(Admin, store)
