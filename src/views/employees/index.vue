<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline font-weight-light primary--text">
            Employees
            <v-spacer />
            <v-text-field
              outlined
              label="Search employees"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />
            <!-- <v-spacer /> -->
            <v-btn color="primary" class="ml-6" @click="drawer = true">
              <v-icon left>mdi-plus</v-icon>
              New employee
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-2" />
            <v-data-table
              :items="allEmployees"
              :headers="headers"
              :search="search"
              @click:row="selectEmployee"
              :loading="loadingEmployees"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-navigation-drawer v-model="drawer" absolute temporary right width="500">
      <h3 class="headline font-weight-light primary--text pa-4">
        Add a new employee
      </h3>
      <v-divider />
      <v-stepper vertical v-model="step">
        <v-stepper-step step="1" :complete="step > 1">
          Basic details
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-form
            ref="basicForm"
            v-model="basicFormValid"
            lazy-validation
            @submit.prevent="next"
          >
            <v-row class="pa-4">
              <v-col>
                <v-text-field
                  outlined
                  label="First name"
                  v-model="employee.personal.firstName"
                  :rules="required"
                  tabindex="1"
                />
                <v-text-field
                  outlined
                  label="ID Number"
                  v-model="employee.statutory.id"
                  :rules="required"
                  tabindex="3"
                />
                <v-text-field
                  outlined
                  label="Position"
                  v-model="salary.position"
                  :rules="required"
                  tabindex="5"
                />
              </v-col>
              <v-col>
                <v-text-field
                  outlined
                  label="Last name"
                  v-model="employee.personal.lastName"
                  :rules="required"
                  tabindex="2"
                />
                <v-text-field
                  outlined
                  label="Telephone"
                  v-model="employee.personal.telephone"
                  :rules="required"
                  tabindex="4"
                />
                <v-text-field
                  outlined
                  label="Start date"
                  v-model="employee.start"
                  :rules="required"
                  tabindex="6"
                />
              </v-col>
            </v-row>
            <v-btn text class="mr-2" @click="cancelNewEmployee">Cancel</v-btn>
            <v-btn color="primary" type="submit">Next</v-btn>
          </v-form>
        </v-stepper-content>
        <v-stepper-step step="2"> Salary details </v-stepper-step>
        <v-stepper-content step="2">
          <v-form
            ref="salaryForm"
            v-model="salaryFormValid"
            lazy-validation
            @submit.prevent="quickAdd"
          >
            <v-row class="pa-4">
              <v-col>
                <v-text-field
                  outlined
                  label="Basic salary"
                  v-model="salary.basic"
                  :rules="required"
                />
                <v-row
                  v-for="(allowance, index) in salary.allowances"
                  :key="index"
                >
                  <v-col class="py-0">
                    <v-text-field
                      outlined
                      label="Name"
                      placeholder="Housing, Telephone, etc."
                      v-model="allowance.name"
                      :rules="required"
                    />
                  </v-col>
                  <v-col class="py-0">
                    <v-text-field
                      outlined
                      label="Amount"
                      v-model="allowance.amount"
                      append-outer-icon="mdi-delete"
                      @click:append-outer="deleteAllowance(index)"
                      :rules="required"
                    />
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-btn text @click="addAllowance">Add allowance</v-btn>
                </div>
              </v-col>
            </v-row>
            <v-btn text @click="step--" class="mr-2">Back</v-btn>
            <v-btn color="primary" @click="quickAdd" :loading="loadingQuickAdd"
              >Save</v-btn
            >
          </v-form>
        </v-stepper-content>
      </v-stepper>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  mounted() {
    const allEmployees = this.$store.state.employees.allEmployees;
    if (allEmployees.length == 0) this.getEmployees();
    this.$store.commit("employees/RESET_EMPLOYEE");
  },
  data: () => ({
    search: "",
    headers: [
      { text: "ID", value: "_id" },
      { text: "Name", value: "personal.firstName" },
      { text: "Position", value: "personal.firstName" },
      { text: "Department", value: "personal.firstName" },
      // { text: 'Leave days', value: 'personal.firstName' },
      // { text: 'Overtime', value: 'personal.firstName' },
    ],
    drawer: false,
    step: 1,
    employee: {
      personal: {
        firstName: "",
        lastName: "",
        telephone: "",
      },
      statutory: {
        id: "",
      },
      start: "",
    },
    salary: {
      position: "",
      basic: "",
      allowances: [],
    },
    basicFormValid: true,
    salaryFormValid: true,
    required: [(v) => !!v || "Required"],
    employees: [],
    loadingEmployees: false,
    loadingQuickAdd: false,
  }),
  computed: {
    ...mapState({
      allEmployees: (state) => state.employees.allEmployees,
    }),
  },
  methods: {
    ...mapActions("employees", ["getAllActiveEmployees", "quickAddEmployee"]),
    async getEmployees() {
      this.loadingEmployees = true;
      await this.getAllActiveEmployees();
      this.loadingEmployees = false;
    },
    cancelNewEmployee() {
      this.$refs.basicForm.reset();
      this.$refs.salaryForm.reset();
      this.drawer = false;
    },
    addAllowance() {
      this.salary.allowances.push({ name: "", amount: "" });
    },
    deleteAllowance(index) {
      this.salary.allowances.splice(index, 1);
    },
    next() {
      if (this.$refs.basicForm.validate()) {
        this.step++;
      }
    },
    async quickAdd() {
      if (this.$refs.salaryForm.validate()) {
        this.loadingQuickAdd = true;
        const id = await this.quickAddEmployee({
          employeeData: this.employee,
          salaryData: this.salary,
        });
        this.loadingQuickAdd = false;
        (this.employee = {
          personal: {
            firstName: "",
            lastName: "",
            telephone: "",
          },
          statutory: {
            id: "",
          },
          start: "",
        }),
          (this.salary = {
            position: "",
            basic: "",
            allowances: [],
          });
        this.step = 1;
        this.$router.push({ name: "employee", params: { id } });
      }
    },
    selectEmployee(employee) {
      this.$router.push({ name: "employee", params: { id: employee._id } });
    },
  },
};
</script>
