import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { createEpicMiddleware, actionMutations } from 'vuex-observable'
import { HomeStateProps } from 'components/home/home.module'
import rootReducer from './reducers'
import rootEpic from './epics'

export interface GlobalState {
  ui: {
    home: HomeStateProps
  }
}

Vue.use(Vuex)

const store = new Store({
  modules: { ui: rootReducer },
  mutations: { ...actionMutations }
})

actionMutations.store = store

createEpicMiddleware(rootEpic, store)

export default store
