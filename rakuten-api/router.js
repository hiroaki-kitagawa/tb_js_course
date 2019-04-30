import Vue from 'vue'
import VueRoute from 'vue-router'
import App from './App.vue'
import HotelDetail from './HotelDetail.vue'

Vue.use(VueRouter)

const router = new VueRoute({
  mode: 'history',
  routes: [
    { path: '/', component: App },
    { path: '/hotels/:id', component: HotelDetail }
  ]
})
export default router
