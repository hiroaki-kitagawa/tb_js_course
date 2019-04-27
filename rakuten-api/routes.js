import Vue from 'vue'
import VueRoute from 'vue-router'

import App from './App.vue'
import HotesDetail from './HotelDetail.vue'

Vue.use(VueRouter)

const router = new VueRoute({
  mode: 'history',
  routes: [
    { path: '/', component: App },
    { path: '/hotes/:id', component: HotelDetail }
  ]
})
export default router
