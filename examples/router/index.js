import AdminComponent from '../containers/admin'
import SearchComponent from '../containers/search'
import ReposComponent from '../containers/repos'

const routeConfig = [
  {
    path: '/admin',
    component: AdminComponent,
    name: 'admin'
  },
  {
    path: '/search',
    component: SearchComponent,
    name: 'search'
  },
  {
    path: '/repos/:user',
    component: ReposComponent,
    name: 'user-repos'
  },
  {
    path: '*',
    redirect: '/search'
  }
]

export default routeConfig
