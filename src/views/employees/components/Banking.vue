<template>
  <v-row>
    <v-col>
      <v-text-field outlined label="Account Name" v-model="accountName" />
      <v-text-field outlined label="Account Number" v-model="accountNumber" />
    </v-col>
    <v-col>
      <v-text-field outlined label="Bank" v-model="bank" />
      <v-text-field outlined label="Bank Code" v-model="bankCode" />
    </v-col>
    <v-col>
      <v-text-field outlined label="Branch" v-model="branch" />
      <v-text-field outlined label="Branch Code" v-model="branchCode" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    accountName: '',
    accountNumber: '',
    bank: '',
    bankCode: '',
    branch: '',
    branchCode: '',
  })
}
</script>