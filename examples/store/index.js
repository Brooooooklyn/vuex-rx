import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { createEpicMiddleware, actionMutations } from 'vuex-observable'
import rootReducer from './reducers'
import rootEpic from './epics'

Vue.use(Vuex)

const store = new Store({
  modules: { ui: rootReducer },
  mutations: { ...actionMutations }
})

actionMutations.store = store

Vue.use(createEpicMiddleware(store), {
  epic: rootEpic
})

export default store
