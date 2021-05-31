<template>
  <div class="row col-12 cel" style="padding: 0 !important;">
    <div class="col-12 months-navgation">
      <div
      :key="i"
      class="month-link"
      @click="setActiveMonth(month)"
      :class="{active: month.month === activeMonth.month}"
      v-for="(month, i) in groupedMonths"
      >
        <div>{{ month.month }}</div>
        <div class="value-label" v-money-format="month.total"></div>
      </div>
    </div>
    <div class="container">
      <div v-if="activeMonth.data && !activeMonth.data.length" class="sem_gasto">
        Você não teve gastos esse mês!
      </div>
      <template v-else>
        <listaitens
        :key="index"
        :data="item"
        v-for="(item, index) in activeMonth.data"
        />
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'
import listaitens from './Lista-itens'

export default {
  name: 'ListaGastos',
  components: {
    listaitens
  },
  data: () => ({
    expenses: [],
    activeMonth: {}
  }),
  created () {
    this.getData()
  },
  mounted () {
    this.setActiveMonth()
  },
  computed: {
    groupedMonths () {
      let groupedMonths = []

      const addCurrentMonth = () => {
        groupedMonths.push({
          data: [],
          total: 0,
          month: moment().format('MM/YYYY')
        })
      }

      if (this.expenses.length) {
        const months = groupBy(this.expenses, i => (
          moment(i.createdAt).format('MM/YYYY')
        ))
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY HH'
          if (moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))) {
            return -1
          } else {
            return +1
          }
        })
        groupedMonths = sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map(i => +i.value).reduce((a, c) => a + c, 0)
        }))

        const lastMonth = moment(groupedMonths[groupedMonths.length - 1].month, 'MM/YYYY')

        if (!lastMonth.isSame(moment(), 'month')) {
          addCurrentMonth()
        }
      } else {
        addCurrentMonth()
      }
      return groupedMonths
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    },
    setActiveMonth (month = null) {
      this.activeMonth = month || this.groupedMonths[this.groupedMonths.length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
  .cel{
    margin-top: 56px;
  }
.container {
  height: calc(100vh - 135px);
  padding-top: 15px;
  overflow: hidden auto;
  padding-bottom: 15px;
  .sem_gasto{
  color: #0e3950 !important;
}
}
.months-navgation{
  right: 0%;
  display: flex;
  background-color: #0e3950;
  .month-link{
    padding: 15px 30px 15px 30px;
    cursor: pointer;
    text-align: center !important;
    &:hover{
      background: white !important;
      color: #0e3950 !important;
    }
    &.active{
      background: white !important;
      color: #0e3950 !important;
    }
    .value-label {
      color: #145D85;
      font-size: 10pt;
    }
  }
}
@media screen and (max-width:767px){
  .container{
    height: calc(100vh - 105px);
  }
  .cel{
    margin-top: 45px;
  }
  .months-navgation{
  .month-link{
    padding: 5px 20px 5px 20px;
    .value-label {
      color: #145D85;
      font-size: 10pt;
    }
  }
}
}
</style>
