import Vue from 'vue'
import router from './routes.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Top from './Top.vue'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Top),
}).$mount('#app')
