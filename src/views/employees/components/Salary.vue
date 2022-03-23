<template>
  <div>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th colspan="4"></th>
                <th class="text-center" colspan="2" style="background-color: #e8e8e8;" v-if="salary.allowances.length > 0">Allowances</th>
                <th class="text-center" v-if="salary.benefits.length > 0">Non-cash benefits</th>
                <th></th>
              </tr>
              <tr>
                <th>Date</th>
                <th>Position</th>
                <th>Department</th>
                <th class="text-right">Basic</th>
                <th class="text-right" style="border-left: 1px solid lightGrey;">Housing</th>
                <th class="text-right">Telephone</th>
                <th class="text-right">Vehicle</th>
                <th class="text-right" style="border-left: 1px solid lightGrey;">Gross</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sal, index) in salary" :key="index">
                <td>{{ sal.date }}</td>
                <td>{{ sal.position }}</td>
                <td>{{ sal.department }}</td>
                <td class="text-right">{{ sal.basic }}</td>
                <td class="text-right" style="border-left: 1px solid lightGrey;"></td>
                <td class="text-right"></td>
                <td class="text-right" style="border-left: 1px solid lightGrey;">{{ sal.gross }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="text-center mt-10">
          <v-btn text @click="showSalaryDialog = true">Change salary</v-btn>
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
    <v-dialog v-model="showSalaryDialog" persistent width="500">
      <v-card>
        <v-card-title class="headline font-weight-light primary--text">Salary</v-card-title>
        <v-card-text>
          <p>Change salary</p>
          <p>Change department</p>
          <p>Change basic & allowances</p>
          <p>Change non-cash benefits</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showSalaryDialog = false">Cancel</v-btn>
          <v-btn color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    edit: false,
    showSalaryDialog: false
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