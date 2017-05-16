import { connect } from 'vuex-observable'
import { searchUsers } from './Search.module'
import store from '../../store'
import UserSearchInput from '../../components/UserSearchInput'
import UserSearchResults from '../../components/UserSearchResults'

const Search = {

  components: {
    UserSearchInput,
    UserSearchResults
  },

  created() {
    this.handleUserSearch(this.query)
  },

  handleUserSearch(query) {
    this.searchUsers(query)
  }
}

// use babel or ts, ({ route, search }) => ({ ...ui.search, query: route.query })
const mapStateToProps = ({ route, ui }) => {
  return Object.assign(ui.search, { query: route ? route.query: '' })
}

export default connect(
  mapStateToProps,
  { searchUsers }
)(Search, store)
