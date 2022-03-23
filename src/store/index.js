import Vue from 'vue'
import Vuex from 'vuex'
import employees from './modules/employees'
import payroll from './modules/payroll'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    employees,
    payroll
  }
})
