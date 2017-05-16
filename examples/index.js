/*
  vuex-observable does not automatically add every RxJS operator to
  the Observable prototype. Because there are many ways to add them,
  our examples will not include any imports. If you want to add every
  operator, put import 'rxjs'; in your entry index.js.

  More info: https://github.com/ReactiveX/rxjs#installation-and-usage
 */
import './RxOperator'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import routeConfig from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routeConfig
})

sync(store, router)

export default new Vue({
  router,
  store
}).$mount('#app')
