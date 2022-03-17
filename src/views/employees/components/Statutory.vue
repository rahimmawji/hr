<template>
  <v-row>
    <v-col>
      <v-text-field outlined label="ID" v-model="id" />
      <v-text-field outlined label="PIN" v-model="pin" />
    </v-col>
    <v-col>
      <v-text-field outlined label="NHIF" v-model="nhif" />
      <v-text-field outlined label="NSSF" v-model="nssf" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    id: '',
    pin: '',
    nhif: '',
    nssf: ''
  })
}
</script>