<template>
  <div>
    <v-row>
      <v-col>
        <h4 class="mb-1">Employment</h4>
        <v-text-field outlined label="Position" v-model="salary.position" />
        <v-text-field outlined label="Department" v-model="salary.department" />
      </v-col>
      <v-col>
        <h4 class="mb-1">Salary History</h4>
        <v-card outlined>
          Date: 
          Basic: {{ salary.basic }}
          Allowances: 
          Gross Sal
        </v-card>
      </v-col>
      <v-col>
        <v-text-field outlined label="Basic salary" v-model="salary.basic" />
        <v-row>
          <v-col>
            <v-text-field
              outlined
              label="Allowance"
              v-model="salary.allowance"
            />
          </v-col>
          <v-col>
            <v-text-field outlined label="Amount" v-model="salary.amount" />
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn text>Add allowance</v-btn>
        </div>
      </v-col>
    </v-row>
    <div class="text-right">
      <v-btn
        :color="edit ? 'success' : 'warning'"
        @click="edit = !edit"
        v-html="edit ? 'Save' : 'Edit'"
      />
    </div>
    <!-- TODO: Add Salary history -->
    <!-- <v-row>
      <v-col>
        <h4>Salary history</h4>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Date</th>
                <th>Basic</th>
                <th>Allowances</th>
              </tr>
            </thead>
          </template>
        </v-simple-table>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    edit: false,
  }),
  computed: {
    ...mapGetters("employees", ["salary"]),
  },
  methods: {
    ...mapMutations("employees", ["UPDATE_EMPLOYEE_DETAIL"]),
    update(category, subcategory, property, value) {
      this.UPDATE_EMPLOYEE_DETAIL({ category, subcategory, property, value });
    },
  },
};
</script>