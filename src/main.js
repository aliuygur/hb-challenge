import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store.js'

import {LinkLocalStorageRepo} from './repos.js'
import {LinkService} from './services.js'

import router from './router.js'

const linkService = new LinkService(new LinkLocalStorageRepo())
Object.defineProperty(Vue.prototype, '$linkService', {
  get() {
    return linkService
  }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
