import { EmployeeService } from "../../services/employees"
import _ from "lodash"
import { omitTypeName } from "../../utils/omitTypeName";
import { removeEmpty } from "../../utils/removeEmpty";

export default {
  namespaced: true,
  state: () => ({
    allEmployees: [],
    advances: [],
    employee: {
      personal: {
        firstName: "",
        middleName: "",
        lastName: "",
        address: {
          number: "",
          street: "",
          city: "",
          pobox: "",
          code: "",
          country: "",
        },
        dateOfBirth: "",
        telephone: "",
        email: "",
      },
      statutory: {
        id: "",
        pin: "",
        nhif: "",
        nssf: "",
      },
      salary: 0,
      salaryHistory: [],
      bank: {
        accountName: "",
        accountNumber: "",
        bank: "",
        bankCode: "",
        branch: "",
        branchCode: "",
      },
      start: "",
      end: "",
      active: false,
      casual: false,
      leave: 0,
      leaveHistory: [],
      loan: 0,
      loanHistory: [],
    },
  }),
  getters: {
    allEmployees: (state) => JSON.parse(JSON.stringify(state.allEmployees)),
    personal: (state) => JSON.parse(JSON.stringify(state.employee.personal)),
    statutory: (state) => JSON.parse(JSON.stringify(state.employee.statutory)),
    salary: (state) => JSON.parse(JSON.stringify(state.employee.salaryHistory.data)),
    bank: (state) => JSON.parse(JSON.stringify(state.employee.bank)),
  },
  mutations: {
    SET_ALL_EMPLOYEES(state, allEmployees) {
      state.allEmployees = allEmployees;
    },
    SET_EMPLOYEE(state, employee) {
      state.employee = employee;
    },
    MERGE_EMPLOYEE_DATA(state, employeeData) {
      let newEmployee = _.merge(state.employee, employeeData)
      state.employee = newEmployee
    },
    UPDATE_EMPLOYEE_DETAIL(state, { category, subcategory, property, value }) {
      if (subcategory == null) state.employee[category][property] = value;
      else state.employee[category][subcategory][property] = value;
    },
    REMOVE_EMPLOYEE (state, id) {
      const index = state.allEmployees.findIndex(i => i._id == id)
      state.allEmployees.splice(index, 1)
    },
    RESET_EMPLOYEE (state) {
      state.employee = {
        personal: {
          firstName: "",
          middleName: "",
          lastName: "",
          address: {
            number: "",
            street: "",
            city: "",
            pobox: "",
            code: "",
            country: "",
          },
          dateOfBirth: "",
          telephone: "",
          email: "",
        },
        statutory: {
          id: "",
          pin: "",
          nhif: "",
          nssf: "",
        },
        salary: 0,
        salaryHistory: [],
        bank: {
          accountName: "",
          accountNumber: "",
          bank: "",
          bankCode: "",
          branch: "",
          branchCode: "",
        },
        start: "",
        end: "",
        active: false,
        casual: false,
        leave: 0,
        leaveHistory: [],
        loan: 0,
        loanHistory: []
      }
    },
    INSERT_EMPLOYEE_ADVANCE (state, {month, year, employeeId, amount}) {
      state.advances.push({ month, year, employeeId, amount })
    }
    
  },
  actions: {
    async getAllActiveEmployees({ commit }) {
      try {
        const result = await EmployeeService.getAllActiveEmployees();
        commit("SET_ALL_EMPLOYEES", result);
      } catch (error) {
        console.log(error);
      }
    },
    async getEmployeeById ({ state, commit }, id) {
      try {
        const employee = await EmployeeService.getEmployeeById(id)
        const result = _.mergeWith(
          {}, state.employee, employee,  
          (a, b) => b === null ? a : undefined)
        commit('SET_EMPLOYEE', result)
      } catch (error) {
        console.log(error)
      }
    },
    async getAdvancesByMonthYear ({ commit }, { month, year }) {
      
    },
    async quickAddEmployee({ commit }, { employeeData, salaryData }) {
      const gross =
        parseFloat(salaryData.basic) + salaryData.allowances.reduce((a, b) => a + (parseFloat(b.amount) || 0), 0);

      employeeData.salary = gross
      employeeData.active = true
      employeeData.casual = false
      employeeData.leave = 0

      const empId = await EmployeeService.createEmployee(employeeData);
      
      salaryData.basic = parseFloat(salaryData.basic)
      salaryData.employee = { connect: empId }
      salaryData.gross = gross
      salaryData.date = employeeData.start
      salaryData.active = true

      await EmployeeService.createSalary(salaryData)

      commit('MERGE_EMPLOYEE_DATA', employeeData)
      return empId
    },
    async updateEmployeeById ({ state }, key) {
      const cleanUpdateData = removeEmpty(omitTypeName(state.employee[key]))
      const employeeData = {}
      employeeData[key] = cleanUpdateData
      try {
        await EmployeeService.partialUpdateEmployee(state.employee._id, employeeData)
      } catch (error) {
        console.log(error)
      }
    },
    async terminateEmployee ({ state, commit }, end) {
      const id = state.employee._id
      try {
        await EmployeeService.partialUpdateEmployee(id, { end, active: false })
        commit('REMOVE_EMPLOYEE', id)
      } catch (error) {
        console.log(error)
      }
    }
  },
};
