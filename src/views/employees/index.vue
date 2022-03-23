<template>
  <div>
    <PageHeading>
      <template v-slot:title>
        Employees
        <v-spacer />
        <v-text-field
          outlined
          label="Search employees"
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          hide-details
        />
        <v-btn color="primary" class="ml-6" @click="drawer = true">
          <v-icon left>mdi-plus</v-icon>
          New employee
        </v-btn>
      </template>
      <template v-slot:body>
        <v-data-table
          :items="allEmployees"
          :headers="headers"
          :search="search"
          @click:row="selectEmployee"
          :loading="loadingEmployees"
        />
      </template>
    </PageHeading>
    <v-navigation-drawer v-model="drawer" absolute temporary right width="500">
      <QuickAddDrawer @closeDrawer="() => drawer = false" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PageHeading from '../../components/PageHeading.vue';
import QuickAddDrawer from './components/QuickAddDrawer.vue';
export default {
  components: { PageHeading, QuickAddDrawer },
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
    employees: [],
    loadingEmployees: false,
    drawer: false
  }),
  computed: {
    ...mapState({
      allEmployees: (state) => state.employees.allEmployees,
    }),
  },
  methods: {
    ...mapActions("employees", ["getAllActiveEmployees"]),
    async getEmployees() {
      this.loadingEmployees = true;
      await this.getAllActiveEmployees();
      this.loadingEmployees = false;
    },
    selectEmployee(employee) {
      this.$router.push({ name: "employee", params: { id: employee._id } });
    }
  },
};
</script>
