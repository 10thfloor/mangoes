import Vuex from 'vuex'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER: function(state, user) {
    state.user = user
  }
}

export const actions = {
  async login() {},
  async Logout() {}
}

const createStore = () => {
  return new Vuex.Store({ state, mutations, actions })
}

export default createStore
