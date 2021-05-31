<template>
  <button class="btn btn-logout custom-button" @click="config()">
    <i class="fa fa-cog"></i>
    <span class="some ml-1">Config</span>
  </button>
</template>

<script>
export default {
  methods: {
    config () {
      this.$router.push({ name: 'config' })
    }
  }
}
</script>

<style scoped lang="scss">
.btn-logout {
  margin-left: 12px;
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
