<template>
  <div>
    <PageHeading>
      <template v-slot:title>Employee</template>
      <template v-slot:body>
        <v-tabs v-model="tab">
          <v-tab>Personal</v-tab>
          <v-tab>Statutory</v-tab>
          <v-tab>Salary</v-tab>
          <v-tab>Banking</v-tab>
          <v-tab>Leave</v-tab>
          <v-tab>Loans</v-tab>
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
            <v-tab-item class="mt-4">Leave</v-tab-item>
            <v-tab-item class="mt-4">Loans</v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </template>
    </PageHeading>
    <!-- <ul>
      <li>firstName*</li>
      <li>middleName</li>
      <li>lastName*</li>
      <li>address</li>
      <li>dateOfBirth*</li>
      <li>telephone*</li>
      <li>email</li>
    </ul> -->
    <!-- <ul>
      <li>id*</li>
      <li>pin</li>
      <li>nhif</li>
      <li>nssf</li>
    </ul> -->
    <ul>
      <li>position*</li>
    </ul>
    <ul>
      <li>department</li>
    </ul>
    <ul>
      <li>basic*</li>
      <li>allowances: [{ name, amount }]</li>
      <li>date*</li>
    </ul>
    <!-- <ul>
      <li>bank</li>
    </ul> -->
    <ul>
      <li>start*</li>
      <li>end*</li>
      <li>active*</li>
      <li>casual*</li>
      <li>leave*</li>
    </ul>
  </div>
</template>

<script>
import PageHeading from '@/components/PageHeading.vue'
import Personal from './components/Personal.vue'
import Statutory from './components/Statutory.vue'
import Banking from './components/Banking.vue'
import Salary from './components/Salary.vue'
export default {
  components: { PageHeading, Personal, Statutory, Banking, Salary },
  data: () => ({
    tab: 0
  })
}
</script>