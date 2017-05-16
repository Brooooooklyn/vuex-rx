import { RouteConfig } from 'vue-router'
import AdminComponent from '../containers/admin'
import SearchComponent from '../containers/search'

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
    path: '*',
    redirect: '/search'
  }
]

export default routeConfig
