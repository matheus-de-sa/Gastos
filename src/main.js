import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/app.scss'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import './utils/directives'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
