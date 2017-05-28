[![CircleCI](https://circleci.com/gh/Brooooooklyn/vuex-observable/tree/master.svg?style=svg)](https://circleci.com/gh/Brooooooklyn/vuex-observable/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/Brooooooklyn/vuex-observable/badge.svg?branch=master)](https://coveralls.io/github/Brooooooklyn/vuex-observable?branch=master)
[![Dependency Status](https://david-dm.org/Brooooooklyn/vuex-observable.svg)](https://david-dm.org/Brooooooklyn/vuex-observable)
[![devDependencies Status](https://david-dm.org/Brooooooklyn/vuex-observable/dev-status.svg)](https://david-dm.org/Brooooooklyn/vuex-observable?type=dev)
# Vuex-Observable [WIP]
Use Vuex + Vue + RxJS like React + Redux + React-redux + Redux-actons + redux-observable.

## Boilerplate
see [example](./examples)

index.vue:

```vue
<template>
  <p v-if="!reposByUser.length">loading...</p>
  <Repos v-else :repos="reposByUser" :user="user"></Repos>
</template>
<script src="./Repos.component.js"></script>
```

Repos.component.js:

```js
import { connect } from 'vuex-rx'
import { requestReposByUser } from './Repos.module'
import store from '../../store'
import Repos from '../../components/Repos'

const UserReposComponent = {

  data() {
    return {
      user: this.$router.currentRoute.params.user
    }
  },

  components: {
    Repos
  },

  created() {
    this.requestReposByUser(this.user)
  }
}

const mapStateToProps = ({ ui }) => {
  return ui.repos
}

export default connect(
  mapStateToProps,
  { requestReposByUser }
)(UserReposComponent, store)

```

Repos.module.js
```js
import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs/Observable'
import { createAction, handleActions } from 'vuex-rx'

export const requestReposByUser = createAction('REQUEST_REPOS_BY_USERS')
const receviedReposByUser = createAction('RECEVIED_REPOS_BY_USERS')

const defaultState = {
  reposByUser: []
}

// reducer
export const reducer = handleActions({

  [receviedReposByUser]: (state, payload) => {
    return { ...state, reposByUser: payload }
  }

}, defaultState)

//epic

export const epic = action$ => action$
  .ofType(`${requestReposByUser}`)
  .map(action => action.payload)
  .switchMap(user =>
    ajax.getJSON(`https://api.github.com/users/${user}/repos`)
      .map(receviedReposByUser)
  )

```

## APIs

- createEpicMiddleware

  - param `store`

    type: `vuex store`

  - usage:
    [example](./examples/store/index.js)

- connect
  - param `mapStateToProps`

    (state: Store) => localState
  - param `mapMutationsToProps`

    type:
    ```ts
    {
      [key: string]: Action
    }
    ```
  - return `Connecter`

    - param `Component`

      type: `vue Object component`

    - param `Store`

      type: `vuex store`

  examples:

  ```js
  const componentA = {
    created() {
      this.requestUsers()
    }
  }

  const mapStateToProps = ({ ui }) => ({ ui.componentA })

  export default connect(mapStateToProps, { requestUsers })
  ```

- createAction
  - param `mutationName`

    type: `string`
  - return `vuexMutation`

- handleActions
  - param `actionMap`

    type:
    ```ts
    {
      [index: actionName]: (state: LocalState, payload) => LocalState
    }
    ```
    `LocalState` here is got from `mapStateToProps`
  - param `defaultState`

    type: `LocalState`

- combineReducer
- combineEpics