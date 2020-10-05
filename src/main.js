import Vue from "vue"
import App from "./App.vue"
import Buefy from "buefy"
import store from "./store.js"
import {contractAddr} from "./network.js"

import "buefy/dist/buefy.css"

require('./css/fonts.css');
require('./css/styles.scss');

Vue.prototype.$contractAddress = contractAddr

Vue.use(Buefy)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')