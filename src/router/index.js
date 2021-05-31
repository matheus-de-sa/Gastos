import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import(/* webpackChunkName: "login" */ '../pages/login/Login')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      meta: {
        title: 'Cadastro'
      },
      component: () => import(/* webpackChunkName: "cadastro" */ '../pages/register/Cadastro')
    },
    {
      path: '/config',
      name: 'config',
      meta: {
        title: 'Configurações',
        requeresAuth: true
      },
      component: () => import(/* webpackChunkName: "Confiracoes" */ '../pages/configuracoes/Configuracoes')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: 'Home',
        requeresAuth: true
      },
      component: () => import(/* webpackChunkName: "home" */ '../pages/home/Home')
    },
    {
      path: '/lista-gastos',
      name: 'lista-gastos',
      meta: {
        title: 'Lista Gastos',
        requeresAuth: true
      },
      component: () => import(/* webpackChunkName: "lista-gastos" */ '../pages/lista-gastos/ListaGastos')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} Gastos 2.0`
  const currentUser = window.uid
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next({ name: 'login' })
  else next()
})

/* router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Expenses`
  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
}) */

export default router
