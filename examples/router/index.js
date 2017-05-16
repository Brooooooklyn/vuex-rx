import { RouteConfig } from 'vue-router'
import AdminComponent from '../container/admin'

const routeConfig: RouteConfig[] = [
  {
    path: '/admin',
    component: ,
    name: 'admin'
  },
  {
    path: '*',
    redirect: '/admin'
  }
]

export default routeConfig
