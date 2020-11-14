import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    account: {},
  },

  getters: {
  },

  mutations: {
    UPDATE_ACCOUNT(state, account) {
      state.account = account
    },
  }
})