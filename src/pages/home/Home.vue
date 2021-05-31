<template>
  <div class="home cel">
    <div class="row home-box">
      <div class="col-12">
        <div class="row justify-content-around justify-content-center aling-items-center text-aling-center">
          <div class="col-5 shadow p-3 bg-body rounded box">
            <small>Você gastou</small>
            <div class="money" v-money-format="totals.totalSpent"></div>
            <small>em {{ totals.compras }} compra</small>
          </div>
          <div class="col-5 shadow p-3 bg-body rounded box">
            <small>A média de gastos é de</small>
            <div class="money" v-money-format="totals.average"></div>
            <small>até o momento</small>
          </div>
          <div class="col-5  shadow p-3 bg-body rounded box">
            <small>O maior gasto foi de</small>
            <div class="money" v-money-format="totals.biggest.value"></div>
            <span>no dia </span>
            <small v-date-format="totals.biggest.createdAt"></small>
          </div>
          <div class="col-5 shadow p-3 bg-body rounded box">
            <small>O menor gasto foi de</small>
            <div class="money" v-money-format="totals.lowest.value"></div>
            <span>no dia </span>
            <small v-date-format="totals.lowest.createdAt"></small>
          </div>
        </div>

        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    expenses: []
  }),
  created () {
    this.getData()
  },
  computed: {
    totals () {
      const { expenses: exp } = this
      const values = {
        totalSpent: 0,
        average: 0,
        biggest: {},
        lowest: {},
        compras: 0
      }

      if (exp.length) {
        values.totalSpent = exp.map(e => +e.value)
          .reduce((acc, cur) => acc + cur, 0)

        values.average = values.totalSpent / exp.length

        values.biggest = exp.sort((a, b) => +b.value - +a.value)[0]
        values.lowest = exp.sort((a, b) => +a.value - +b.value)[0]
        values.compras = exp.length
      }

      return values
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .cel{
    margin-top: 250px;
  }
  .box{
    margin-bottom: 40px;
  }
  .home-box{
    color: #145D85 !important;
    font-size: 25pt;
    text-align: center;
    small{
      font-size: 15pt;
    }
    span{
      font-size: 15pt;
    }
    .money{
      color: #145D85 !important;
    }
}
@media screen and (max-width:767px){
.cel{
    margin-top: 180px;
  }
.home{

  .box{
    margin-bottom: 30px;
  }
  .home-box{
    text-align: center;
    font-size: 15pt;
    small{
      font-size: 15pt;
    }
    span{
      font-size: 15pt;
    }
  }
}
}
</style>
