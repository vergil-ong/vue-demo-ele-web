import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:8002/v1'
axios.defaults.crossDomain = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
