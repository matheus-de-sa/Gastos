<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top shadow p-2 bg-body" style="background: #145D85">
      <div class="container-fluid">
        <button class="navbar-toggler mr-2 mr-sm-0" data-toggle="collapse" data-target="#nav-principal">
          <i class="fas fa-bars text-white"></i>
        </button>
        <div class="collapse navbar-collapse" id="nav-principal">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link exact exact-active-class="active" to="/home" class="nav-link ml-2 ml-sm-0 "><i class="fa fa-home peq1"></i> Home</router-link>
            </li>
            <li class="nav-item">
              <router-link exact exact-active-class="active" to="/lista-gastos" class="nav-link ml-2 ml-sm-0"><i class="fa fa-list-ul peq1"></i> Lista de Gastos</router-link>
            </li>
            <li class="nav-item">
              <layout-new-expense class="nav-link ml-sm-0 mais"/>
            </li>
            <li class="nav-item divisor"></li>
            <li class="nav-item">
              <layout-config class="nav-link ml-2 ml-sm-0"/>
            </li>
            <li class="nav-item">
              <layout-logout class="nav-link ml-2 ml-sm-0"/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import LayoutConfig from './LayoutConfig.vue'
import LayoutLogout from './LayoutLogout'
import LayoutNewExpense from './LayoutNewExpense'

export default {
  components: {
    LayoutLogout,
    LayoutNewExpense,
    LayoutConfig
  }
}
</script>

<style lang="scss" scoped>
.mais{
  margin-left: 10px;
}
.divisor{
    width: auto;
    height: 1px;
    background: white;
}
@media (min-width: 768px) {
    .divisor{
        height: auto;
        width: 1px;
        background: white;
        margin: 12px 15px;
    }
}
</style>
