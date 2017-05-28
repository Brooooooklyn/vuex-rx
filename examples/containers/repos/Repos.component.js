import { connect } from 'vuex-rx'
import { requestReposByUser } from './Repos.module'
import store from '../../store'
import Repos from '../../components/Repos'

const UserReposComponent = {

  data() {
    return {
      user: this.$router.currentRoute.params.user
    }
  },

  components: {
    Repos
  },

  created() {
    this.requestReposByUser(this.user)
  }
}

const mapStateToProps = ({ ui }) => {
  return ui.repos
}

export default connect(
  mapStateToProps,
  { requestReposByUser }
)(UserReposComponent, store)
