<template>
  <div id="app">
    <base-spinner/>
      <layout-notification/>
      <div class="container-fluid" v-if="isLogged" style="padding: 0 !important">
        <div class="flex-colunm">
          <div class="navigation-sidebar" style="padding: 0 !important">
            <layout-navigation/>
          </div>
          <div class="home" style="padding:0;">
            <router-view/>
        </div>
      </div>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/LayoutNavigation'
import LayoutNotification from './components/layout/LayoutNotification'

export default {
  name: ('App'),
  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification
  },
  data: () => ({ isLogged: false }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user
      this.$router.push({ name: window.uid ? 'home' : 'login' })

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss">
.app-title{
  color: white !important;
}
.home{
  display: flex;
  justify-content: center;
  align-items: center;
}
#app{
  background-image: url(./assets/img/grafico.png) no-repeat;
  min-height: 100vh;
  color: var(--light);
  background-color: #F5F9FA;
  overflow: hidden auto;
}
</style>
