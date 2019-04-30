import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import HotelDetail from '.HotelDEtail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: App },
    { path: '/hotels/:id', component: HotelDetail }
  ]
})

export default router
