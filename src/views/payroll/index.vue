<template>
  <div>
    <PageHeading>
      <template v-slot:title>Payroll</template>
      <template v-slot:body>
        <v-data-table :headers="headers" :items="activeSalaries">
          <template v-slot:item.absentDays="{ item }">
            <v-text-field hide-details dense v-model="item.absentDays" />
          </template>
        </v-data-table>
      </template>
    </PageHeading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeading from '../../components/PageHeading.vue'
export default {
  components: { PageHeading },
  mounted () {
    this.$store.dispatch('payroll/getActiveSalaries')
  },
  data: () => ({
    headers: [
      { text: 'ID', value: 'employee._id' },
      { text: 'Name', value: 'employee.personal.firstName' },
      { text: 'Basic', value: 'basic' },
      { text: 'Allowances', value: '' },
      { text: 'Benefits', value: '' },
      { text: 'Gross pay', value: 'gross' },
      { text: 'Days', value: 'absentDays' },
      { text: 'Amount', value: 'absentAmount' },
      { text: 'Adjusted Gross pay', value: '' },
      { text: 'PAYE', value: '' },
      { text: 'NHIF', value: '' },
      { text: 'NSSF', value: '' },
      { text: 'Deductions', value: '' },
      { text: 'Net pay', value: '' },
    ],
  }),
  computed: {
    ...mapGetters('payroll', ['activeSalaries'])
  }
}
</script>