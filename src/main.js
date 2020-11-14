import Vue from "vue"
import App from "./App.vue"
import Buefy from "buefy"
import store from "./store.js"

import "buefy/dist/buefy.css"
import '@mdi/font/css/materialdesignicons.css'

require('./css/fonts.css');
require('./css/styles.scss');

Vue.use(Buefy)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')