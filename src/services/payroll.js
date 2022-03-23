import { apolloClient } from "../vue-apollo"
import { activeSalaries } from '@/graphql/payroll/queries.gql'

export const PayrollService = {
  async getActiveSalaries () {
    try {
      const result = await apolloClient.query({
        query: activeSalaries
      })
      return result.data.activeSalaries.data
    } catch (error) {
      console.log('Error in EmployeeService: getEmployeeById:', error)
      throw error
    }
  }
}