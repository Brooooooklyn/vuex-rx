import Vue, { ComponentOptions } from 'vue'
import { Payload, Store, mapMutations, Module } from 'vuex'

export interface Reducer<S, A> {
  [index: string]: (state: S, mutation: A) => S
}

export const combineReducers = (reducerMap: {
  [index: string]: Module<any, any>
}) => {
  const vuexMoule: Module<any, any> = Object.create(null)
  vuexMoule.modules = reducerMap
  return vuexMoule
}

export const handleActions = <S>(reducer: Reducer<S, any>, defaultState: S = { } as any) => {
  const vuexMoule: Module<S, any> = Object.create(null)
  vuexMoule.mutations = Object.keys(reducer).reduce((acc, cur) => {
    acc[cur] = (state: S, mutaition: any) => {
      const newLocalState = reducer[cur](state, mutaition)
      Object.assign(state, newLocalState)
    }
    return acc
  }, {})
  vuexMoule.state = defaultState
  return vuexMoule
}

export interface ActionPayload<T> extends Payload {
  payload: T
}

export type MapStateToProps<S, P> = (state: S) => P

export type MapDispatchToProps<S> = {
  [name: string]: ReduxLikeAction<any>
}

export type ReduxLikeAction<T> = (payload?: T) => void

export const actionMutations = Object.create(null)

export const createAction = <T>(actionName: string): ReduxLikeAction<T> => {
  actionMutations[actionName] = (state: any, _: any) => state
  const action = (payload?: T) => {
    actionMutations.store.commit(actionName, payload)
  }
  action.toString = () => actionName
  return action
}

export function connect <S, P extends Object>(
  mapStateToProps: MapStateToProps<S, P>,
  mapDispatchToProps: MapDispatchToProps<P>
): (component: ComponentOptions<Vue & P>, store: Store<S>) => ComponentOptions<P & Vue> {
  return (component: ComponentOptions<Vue & P>, store: Store<S>): ComponentOptions<P & Vue> => {
    const methods = component.methods ? component.methods : { }
    component.methods = {
      ...methods,
      ...mapMutations(
        Object.keys(mapDispatchToProps).reduce((acc, curr) => {
          const reducer = mapDispatchToProps[curr]
          acc[curr] = reducer.toString()
          return acc
        }, {}))
    }
    const stateProps = mapStateToProps(store.state)
    const computed = component.computed ? (component as any).computed : Object.create(null)
    component.computed = {
      ...computed,
      ...Object.keys(stateProps).reduce((acc, cur) => {
        acc[cur] = () => stateProps[cur]
        return acc
      }, {})
    }
    return component
  }
}
