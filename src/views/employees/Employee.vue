<template>
  <div>
    <PageHeading>
      <template v-slot:title>Employee</template>
      <template v-slot:body>
        <div v-if="loadingEmployee">
          <div class="text-center mt-8">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </div>
        <div v-else>
          <v-tabs v-model="tab">
            <v-tab>Personal</v-tab>
            <v-tab>Statutory</v-tab>
            <v-tab>Salary</v-tab>
            <v-tab>Banking</v-tab>
            <v-tab disabled>Leave</v-tab>
            <v-tab disabled>Loans</v-tab>
            <v-tab>Terminate</v-tab>
            <v-tabs-items v-model="tab">
              <v-tab-item class="mt-4">
                <personal />
              </v-tab-item>
              <v-tab-item class="mt-4">
                <statutory />
              </v-tab-item>
              <v-tab-item class="mt-4">
                <salary />
              </v-tab-item>
              <v-tab-item class="mt-4">
                <banking />
              </v-tab-item>
              <v-tab-item class="mt-4">TODO: Leave</v-tab-item>
              <v-tab-item class="mt-4">TODO: Loans</v-tab-item>
              <v-tab-item class="mt-4">
                <terminate />
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </div>
      </template>
    </PageHeading>
  </div>
</template>

<script>
import PageHeading from "@/components/PageHeading.vue";
import Personal from "./components/Personal.vue";
import Statutory from "./components/Statutory.vue";
import Banking from "./components/Banking.vue";
import Salary from "./components/Salary.vue";
import Terminate from './components/Terminate.vue';
export default {
  mounted () {
    let employee = this.$store.state.employees.employee
    if (!('_id' in employee)) {
      this.getEmployee()
    }
  },
  components: { PageHeading, Personal, Statutory, Banking, Salary, Terminate },
  data: () => ({
    tab: 0,
    loadingEmployee: false
  }),
  methods: {
    async getEmployee () {
      this.loadingEmployee = true
      let id = this.$route.params.id
      await this.$store.dispatch('employees/getEmployeeById', id)
      this.loadingEmployee = false
    }
  }
};
</script>
