<template>
  <div>
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
              <v-menu v-model="startDateMenu">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    label="Start date"
                    v-model="employee.start"
                    :rules="required"
                    tabindex="6"
                    v-on="on"
                    v-bind="attrs"
                    readonly
                  />
                </template>
                <v-date-picker v-model="employee.start" @input="startDateMenu = false" />
              </v-menu>
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
                    :label="allowance.type == 'allowance' ? 'Cash allowance' : 'Non-cash benefit'"
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
                <v-btn text @click="addAllowance('benefit')">Add non-cash benefit</v-btn>
                <v-btn text @click="addAllowance('allowance')">Add allowance</v-btn>
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
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  mounted () {
    let today = new Date().toISOString().substring(0, 10)
    this.employee.start = today
  },
  data: () => ({
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
    startDateMenu: false,
    loadingQuickAdd: false,
  }),
  methods: {
    ...mapActions("employees", ["quickAddEmployee"]),
    cancelNewEmployee() {
      this.$refs.basicForm.reset();
      this.$refs.salaryForm.reset();
      this.$emit('closeDrawer');
    },
    addAllowance(type) {
      this.salary.allowances.push({ name: "", amount: "", type });
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
  }
}
</script>