import { PayrollService } from "../../services/payroll"

export default {
  namespaced: true,
  state: () => ({
    activeSalaries: []
  }),
  getters: {
    activeSalaries: state => JSON.parse(JSON.stringify(state.activeSalaries))
  },
  mutations: {
    SET_ACTIVE_SALARIES (state, payload) {
      state.activeSalaries = payload
    }
  },
  actions: {
    async getActiveSalaries ({ commit }) {
      try {
        const result = await PayrollService.getActiveSalaries()
        commit('SET_ACTIVE_SALARIES', result)
      } catch (error) {
        console.log('PayrollStore - getActiveSalaries: ', error);
      }
    }
  }
}