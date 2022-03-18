import { apolloClient } from "../vue-apollo";
import { createEmployee, createSalary } from '@/graphql/employees/mutations.gql'
import { allEmployees, findEmployeeById } from '@/graphql/employees/queries.gql'

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
  async getAllEmployees() {
    const result = await apolloClient.query({
      query: allEmployees
    })
    return result
  },
  async getEmployeeById(id) {
    return await apolloClient.query({
      query: findEmployeeById,
      variables: { id }
    })
  }
}