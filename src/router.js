import Vue from 'vue'
import Router from 'vue-router'
import AddLink from './components/AddLink.vue'
import List from './components/List.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: List
    },
    {
      path: '/add-link',
      name: 'Add Link',
      component: AddLink
    }
  ]
})