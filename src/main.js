import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/fonts/style.css'
import './assets/css/common.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
