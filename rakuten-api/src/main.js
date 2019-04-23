import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import Search from './components/*.vue'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
  },
  installComponents: false,
});

new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')
