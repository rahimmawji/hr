import { apolloClient } from "../vue-apollo"
import { createEmployee, createSalary, partialUpdateEmployee } from '@/graphql/employees/mutations.gql'
import { activeEmployees, findEmployeeByID } from '@/graphql/employees/queries.gql'

export const EmployeeService = {
  async createEmployee (employeeData) {
    const result = await apolloClient.mutate({
      mutation: createEmployee,
      variables: { employeeData }
    })
    return result.data.createEmployee._id
  },
  async createSalary (salaryData) {
    await apolloClient.mutate({
      mutation: createSalary,
      variables: { salaryData }
    })
  },
  async getAllActiveEmployees() {
    try {
      const result = await apolloClient.query({
        query: activeEmployees
      })
      return result.data.activeEmployees.data
    } catch (error) {
      console.log('Error in EmployeeService: getEmployeeById:', error)
      throw error
    }
  },
  async getEmployeeById(id) {
    try {
      const result = await apolloClient.query({
        query: findEmployeeByID,
        variables: { id }
      })
      return result.data.findEmployeeByID
    } catch (error) {
      console.log('Error in EmployeeService: getEmployeeById:', error)
      throw error
    }
  },
  async partialUpdateEmployee (id, employeeData) {
    try {
      const result = await apolloClient.mutate({
        mutation: partialUpdateEmployee,
        variables: { id, employeeData }
      })
      return result.data.partialUpdateEmployee
    } catch (error) {
      console.log('Error in EmployeeService: partialUpdateEmployee:', error)
      throw error
    }
  }
}