<template>
    <div>
      <span @click="showModal=true" class="custom-button" style="cursor: pointer">
        <i class="fa fa-plus"></i>
        <span class="some"> Novo gasto</span>
      </span>
      <form @submit.prevent="submit()">
      <div class="modal fade" :class="{show: showModal}" style="display: block" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Adicionar um novo gasto</h5>
              <button type="button" class="close" @click="closeModal()">
              <span aria-hidden="true">x</span>
              </button>
            </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-8">
                <label for="">Descrição:</label>
                <input
                type="text"
                v-model="form.description"
                class="form-control"
                required>
              </div>
              <div class="form-group col-4">
                <label for="">Valor (R$):</label>
                <input
                type="text"
                v-model="form.value"
                class="form-control"
                required>
              </div>
              <div class="form-group col-12 flex-colunm d-flex align-items-center justify-content-center mb-1">
                <input
                ref="input"
                accept="image/*"
                class="d-none"
                type="file"
                @change="handleFile($event)"
                >
                <button
                @click="openFileDialog()"
                type="button"
                class="btn btn-outline-secondary w-50">
                Adicionar Comprovante
                </button>
              </div>
                <div class="form-group col-12 d-flex mb-0 justify-content-center align-items-center" v-if="form.receipt">
                  {{ form.receipt.name }}
                  <button
                  type="button"
                  @click="form.receipt = ''"
                  class="btn badge-light"
                  >
                    <i class="fa fa-trash text-danger"></i>
                  </button>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary custom-button"  @click="closeModal()">Fechar</button>
          <button class="btn btn-primary custom-button" :disabled="loading">
            <template v-if="loading">
              <i class="fa fa-spin fa-spinner"></i>
              Incluindo...
            </template>
            <template v-else>
              Incluir novo gasto
            </template>
            </button>
          </div>
          </div>
        </div>
      </div>
      </form>
      <div class="modal-backdrop fade" :style="{display: showModal ? 'block' : 'none'}" :class="{show: showModal}"></div>
    </div>
</template>

<script>
export default {
  data: () => ({
    showModal: false,
    loading: false,
    form: {
      receipt: '',
      value: '',
      description: ''
    }
  }),
  computed: {
    fileName () {
      const { receipt } = this.form

      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    openFileDialog () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    handleFile ({ target }) {
      this.form.receipt = target.files[0]
    },
    closeModal () {
      this.showModal = false
    },
    async submit () {
      let url = ''
      this.loading = true

      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase.storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id,
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime()
        }
        ref.child(id).set(payload, err => {
          this.$root.$emit('Spinner::hide')
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Não foi possível inserir o gasto, tente novamente.'
            })
            this.loading = false
          } else {
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Gasto inserido com sucesso.'
            })
            this.closeModal()
            this.loading = false
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possível inserir o gasto, tente novamente.'
        })
        this.loading = false
      } finally {
        this.$root.$emit('Spinner::hide')
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  color: #111;
}
.some {
}
@media screen and (max-width: 1480px) {
  .some {
    margin-left: 0;
  }
}
</style>
