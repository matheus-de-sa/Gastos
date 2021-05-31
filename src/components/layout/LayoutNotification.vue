<template>
  <div
  v-if="show"
  :class="`alert-${type}`"
  class="alert alert-dismissible fade show">
    {{ message }}
    <button type="button" class="close" @click="close()">x</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    message: '',
    type: 'danger'
  }),
  created () {
    this.$root.$on('Notification::show', payload => {
      this.show = true
      this.type = payload.type
      this.message = payload.message

      setTimeout(() => { this.close() }, payload.timeout || 4000)
    })
  },
  methods: {
    close () {
      this.message = ''
      this.type = 'danger'
      this.show = false
    }
  }
}
</script>

<style scoped>
.alert{
  position: absolute;
  top: 20px;
  z-index: 10000000000;
  max-width: 400px;
  right: 20px;
}
</style>
