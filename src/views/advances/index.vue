<template>
  <v-container>
    <PageHeading>
    <template v-slot:title>
      <v-row>
        <v-col>Advances </v-col>
        <v-col cols="2">
          <v-select
            outlined
            label="Year"
            :items="['2022']"
            v-model="year"
            hide-details
          />
        </v-col>
        <v-col cols="2">
          <v-select
            outlined
            label="Month"
            :items="months"
            item-text="name"
            item-value="month"
            v-model="month"
            hide-details
          />
        </v-col>
        <v-col cols="1">
          <v-btn color="primary" class="mt-4">Save</v-btn>
        </v-col>
      </v-row>
    </template>
    <template v-slot:body>
      <v-data-table
        :headers="headers"
        :items="allEmployees"
        :loading="loadingEmployees"
      >
        <template v-slot:item.name="{ item }">
          {{ item.personal.firstName }} {{ item.personal.lastName }}
        </template>
        <template v-slot:item.advance="{ item }">
          <v-text-field @change="update($event, item)" />
        </template>
      </v-data-table>
    </template>
  </PageHeading>
  </v-container>
</template>
<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import PageHeading from '../../components/PageHeading.vue'
  import months from '../../utils/months'
  export default {
    mounted() {
      this.month = new Date().getMonth()
      let allEmployees = this.$store.state.employees.allEmployees
      if (allEmployees.length == 0) this.getEmployees()
    },
    components: { PageHeading },
    data: () => ({
      year: '2022',
      month: 0,
      months,
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Name', value: 'name' },
        { text: 'Advance', value: 'advance' },
      ],
      loadingEmployees: false,
    }),
    computed: {
      ...mapGetters('employees', ['allEmployees']),
    },
    methods: {
      ...mapMutations('employees', ['INSERT_EMPLOYEE_ADVANCE']),
      ...mapActions('employees', ['getAllActiveEmployees']),
      async getEmployees() {
        this.loadingEmployees = true
        await this.getAllActiveEmployees()
        this.loadingEmployees = false
      },
      update(value, employee) {
        this.INSERT_EMPLOYEE_ADVANCE({
          month: parseInt(this.month),
          year: parseInt(this.year),
          employeeId: employee._id,
          amount: value,
        })
      },
    },
  }
</script>
