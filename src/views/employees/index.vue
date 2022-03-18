<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline font-weight-light primary--text">
            Employees
            <v-spacer />
            <v-text-field
              label="Search"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />
            <v-spacer />
            <v-btn color="primary" @click="drawer = true">
              <v-icon left>mdi-plus</v-icon>
              New employee
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-2" />
            <v-data-table />
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
                <v-text-field outlined label="First name" v-model="employee.personal.firstName" :rules="required" />
                <v-text-field outlined label="ID Number" v-model="employee.statutory.id" :rules="required" />
                <v-text-field outlined label="Position" v-model="salary.position" :rules="required" />
              </v-col>
              <v-col>
                <v-text-field outlined label="Last name" v-model="employee.personal.lastName" :rules="required" />
                <v-text-field outlined label="Telephone" v-model="employee.personal.telephone" :rules="required" />
                <v-text-field outlined label="Start date" v-model="employee.start" :rules="required" />
              </v-col>
            </v-row>
            <v-btn text class="mr-2">Cancel</v-btn>
            <v-btn color="primary" type="submit">Next</v-btn>
          </v-form>
        </v-stepper-content>
        <v-stepper-step step="2"> Salary details </v-stepper-step>
        <v-stepper-content step="2">
          <v-form ref="salaryForm" v-model="salaryFormValid" lazy-validation @submit.prevent="quickAdd">
            <v-row class="pa-4">
              <v-col>
                <v-text-field outlined label="Basic salary" v-model="salary.basic" :rules="required" />
                <v-row v-for="(allowance, index) in salary.allowances" :key="index">
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
            <v-btn color="primary" @click="quickAdd">Save</v-btn>
          </v-form>
        </v-stepper-content>
      </v-stepper>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  mounted () {
    this.getEmployees()
  },
  data: () => ({
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
  }),
  methods: {
    ...mapActions("employees", ["getAllEmployees", "quickAddEmployee"]),
    async getEmployees () {
      await this.getAllEmployees()
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
        await this.quickAddEmployee({ employeeData: this.employee, salaryData: this.salary })
        
      }
    },
  },
};
</script>