import { connect } from 'vuex-rx'
import { searchUsers } from './Search.module'
import store from '../../store'
import UserSearchInput from '../../components/UserSearchInput'
import UserSearchResults from '../../components/UserSearchResults'

const Search = {

  data() {
    return {
      query: this.$router ? this.$router.currentRoute.query.q : ''
    }
  },

  methods: {
    search(q) {
      // side effect ...
      this.$router.replace(`?q=${q}`)
      this.searchUsers(q)
    }
  },

  components: {
    UserSearchInput,
    UserSearchResults
  },

  created() {
    this.searchUsers(this.query)
  }
}

const mapStateToProps = ({ ui }) => {
  return ui.search
}

export default connect(
  mapStateToProps,
  { searchUsers }
)(Search, store)
