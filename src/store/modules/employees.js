import { EmployeeService } from "../../services/employees";

export default {
  namespaced: true,
  state: () => ({
    allEmployees: [],
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
      salary: {
        position: "",
        department: "",
        basic: "",
        allowances: [],
        date: "",
      },
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
    personal: (state) => JSON.parse(JSON.stringify(state.employee.personal)),
    statutory: (state) => JSON.parse(JSON.stringify(state.employee.statutory)),
    salary: (state) => JSON.parse(JSON.stringify(state.employee.salary)),
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
      state.employee = { ...state.employee, ...employeeData };
    },
    UPDATE_EMPLOYEE_DETAIL(state, { category, subcategory, property, value }) {
      console.log(category, subcategory, property, value);
      if (subcategory == null) state.employee[category][property] = value;
      else state.employee[category][subcategory][property] = value;
    },
  },
  actions: {
    async getAllEmployees({ commit }) {
      try {
        const result = await EmployeeService.getAllEmployees();
        commit("SET_ALL_EMPLOYEES", result.data.allEmployees.data);
      } catch (error) {
        console.log(error);
      }
    },
    async quickAddEmployee({ commit }, { employeeData, salaryData }) {
      const gross =
        parseFloat(salaryData.basic) + salaryData.allowances.reduce((a, b) => a + (parseFloat(b.amount) || 0), 0);

      employeeData.salary = gross
      employeeData.active = true
      employeeData.casual = false
      employeeData.leave = 0

      const empId = await EmployeeService.createEmployee(employeeData);
      
      salaryData.employee = { connect: empId }
      salaryData.gross = gross
      salaryData.date = employeeData.start
      salaryData.active = true

      await EmployeeService.createSalary(salaryData)

      commit("MERGE_EMPLOYEE_DATA", employeeData);
    },
  },
};
