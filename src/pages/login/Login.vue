<template>
  <div>
  <form class="form-login" @submit.prevent="login()">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Gastos 2.0</h1>
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
        <button class="btn btn-primary w-50 custom-button" :disabled="loading">
          <template v-if="loading">
            Entrando... <i class="fas fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Entrar <i class="fas fa-sign-in-alt"></i>
          </template>
        </button>
        <button type="button" class="btn btn-danger w-50 custom-button" @click="Registre()">
          Registre-se
        </button>
        <div class="d-flex justify-content-center align-items-center mt-3">
        <span>Ou acesse com</span>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-3 mb-0">
          <span class="" @click="Google()"><i class="fab fa-google fa-2x icone"></i></span>
        </div>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Login',
  data: () => {
    return {
      loading: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      this.loading = true
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        var user = firebase.auth().currentUser
        if (user) {
          var emailVerified = user.emailVerified
          if (!emailVerified) {
            this.$firebase.auth().signOut()
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Por favor verificar o e-mail enviado para autenticação.'
            })
          }
        } if (emailVerified) {
          window.uid = res.user.uid
        }
      } catch (err) {
        let message = ''
        switch (err.code) {
          case 'auth/user-not-found':
            message = 'Não foi possível localizar o usuário.'
            break
          case 'auth/wrong-password':
            message = 'Senha ou E-mail errado, por favor tente novamente.'
            break
          default:
            message = 'Não foi possível fazer login.'
        }
        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
        this.loading = false
      }
    },
    Registre () {
      this.$router.push({ name: 'cadastro' })
    },
    Google () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
      }).catch((err) => {
        alert('Ooops' + err.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-login{
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
