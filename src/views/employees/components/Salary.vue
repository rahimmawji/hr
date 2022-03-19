<template>
  <div>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th colspan="4"></th>
                <th class="text-center" colspan="2">Allowances</th>
                <th></th>
              </tr>
              <tr>
                <th>Date</th>
                <th>Position</th>
                <th>Department</th>
                <th class="text-right">Basic</th>
                <th class="text-right" style="border-left: 1px solid lightGrey;">Housing</th>
                <th class="text-right">Telephone</th>
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
        <div class="text-center">
          <v-btn text>Change salary</v-btn>
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