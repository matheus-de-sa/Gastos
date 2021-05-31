<template>
  <div class="cadastro">
      <form class="form-cadastro" @submit.prevent="register()">
    <div class="card">
      <div class="card-header text-center d-flex justify-content-between" >
        <h1 class="mb-0">Cadastro</h1>
          <button type="button" class="close fechar" @click="closeCadastro()">
          <span aria-hidden="true">x</span>
          </button>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input
          required
          type="email"
          v-model="email"
          class="form-control"
          placeholder="E-mail">
        </div>
        <div class="form-group">
          <input
          required
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Senha">
        </div>
        <div class="form-group">
          <input
          required
          type="text"
          v-model="userid"
          class="form-control"
          placeholder="Como quer ser chamado?">
        </div>
        <div class="form-group">
          <input
          required
          type="text"
          v-model="name"
          class="form-control"
          placeholder="Nome Completo">
        </div>
        <div class="form-group">
          <input
          required
          type="date"
          v-model="idade"
          class="form-control"
          >
        </div>
        <button class="btn btn-danger w-100 custom-button" :disabled="loading">
          <template v-if="loading">
            Cadastrando... <i class="fas fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Confirmar <i class="fas fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
      <div>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
export default {
  name: 'Cadastro',
  data: () => {
    return {
      close: true,
      loading: false,
      email: '',
      password: '',
      userid: '',
      name: '',
      date: ''
    }
  },
  methods: {
    async register () {
      this.loading = true
      try {
        await this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((res) => {
          res.user.updateProfile({
            niver: this.date
          })
        }).then(() => {
          var user = this.$firebase.auth().currentUser
          user.sendEmailVerification()
          this.$root.$emit('Notification::show', {
            type: 'success',
            message: 'E-mail de autenticação enviado.'
          })
          alert(this.name)
          this.$root.$emit('Spinner::show')
          this.$firebase.auth().signOut()
          this.$root.$emit('Spinner::show')
        })
      } catch (err) {
        console.error(err)
      }
      this.$root.$emit('Spinner::hide')
    },
    closeCadastro () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped lang="scss">
.form-cadastro{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.card{
  width: 30%;
  color: #145D85;
}
h1{
font-size: 18pt;
}
@media screen and (max-width:767px){
  .card{
    width: 80%;
  }
}
</style>
