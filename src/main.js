import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/app.scss'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import './utils/directives'

Vue.prototype.$firebase = firebase.initializeApp({
  apiKey: 'AIzaSyCIIQVOVVJtyC9Fg8CCpXkDJbre7YC2gYg',
  authDomain: 'vue-projeto-b8c20.firebaseapp.com',
  projectId: 'vue-projeto-b8c20',
  storageBucket: 'vue-projeto-b8c20.appspot.com',
  databaseURL: 'https://vue-projeto-b8c20-default-rtdb.firebaseio.com/',
  messagingSenderId: '183270868613',
  appId: '1:183270868613:web:cfd6aa8f8b78aaf4274bec'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
