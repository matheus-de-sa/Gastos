<template>
  <button class="btn btn-logout custom-button" @click="logout()">
    <i class="fa fa-power-off"></i><span class="some ml-1">Sair</span>
  </button>
</template>

<script>
export default {
  methods: {
    async logout () {
      this.$root.$emit('Spinner::show')

      await this.$firebase.auth().signOut()

      this.$router.push({ name: 'login' })

      this.$root.$emit('Spinner::hide')
    }
  }
}
</script>

<style scoped lang="scss">
.btn-logout {
  cursor: pointer;
  color: white;
  &:hover {
    color: #0e3950;
  }
}
@media screen and (max-width: 1560px) {
  .btn-logout{
    margin-left: 5px;
  }
}
@media screen and (max-width: 1200px) {
  .btn-logout{
    margin-left: 5px;
  }
}
</style>
