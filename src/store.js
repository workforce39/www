import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

import {contractAddrMain, contractAddrRopsten} from "./network.js";

export default new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    account: {},
    network: 'Mainnet'
  },

  getters: {
    getContractAddress: (state) => {
      switch(state.network) {
        case 'Mainnet':
          return contractAddrMain;
        case 'Ropsten Testnet':
          return contractAddrRopsten;
      }
    }
  },

  mutations: {
    UPDATE_ACCOUNT(state, account) {
      state.account = account
    },
    UPDATE_NETWORK(state, network) {
      switch(network) {
        case '1':
        case 'main':
          state.network = 'Mainnet';
          break;
        case '3':
        case 'ropsten':
          state.network = 'Ropsten Testnet';
      }
    }
  }
})