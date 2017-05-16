import { connect } from 'vuex-observable'
import { searchUsers } from './Search.module'
import store from '../../store'

const Search = {

  created() {
    this.handleUserSearch(this.query)
  },

  handleUserSearch(query) {
    this.searchUsers(query)
  }
}

export const connect(
  ({ route, search }) => ({
    ...search,
    query: route.query
  }),
  { searchUsers }
)
