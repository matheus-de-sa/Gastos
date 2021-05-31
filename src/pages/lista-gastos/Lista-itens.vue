<template>
  <div class="list-items row justify-content-center">
    <div class="col-7 texto">
      <div>{{ data.description }}</div>
      <small v-date-format="data.createdAt"></small>
    </div>
    <div class="col-5 valor" >
      <div class="d-flex justify-content-between">
        <span v-money-format="data.value"></span>
        <span><i
        @click="openReceipt()"
        v-if="data.receipt"
        class="fas fa-file ml-3"></i></span>
        <span @click="removerGasto()">X</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true }
  },
  methods: {
    openReceipt () {
      window.open(this.data.receipt, '_blank')
    },
    removerGasto () {
      this.$firebase.database().ref(window.uid).remove()
    }
  }
}
</script>

<style lang="scss" scoped>
i{
  cursor: pointer;
}
.list-items{
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  color:#134e6e;
  border-bottom: 1px solid #145D85;
  .valor{
    margin-top: 15px;
  }
}
@media screen and (max-width:767px){
  .list-items{
    .data{
      font-size: 12px;
    }
    .texto{
      font-size: 15px;
    }
    .valor{
      font-size: 15px;
    }
  }
}
</style>
