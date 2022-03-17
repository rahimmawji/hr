<template>
  <v-row>
    <v-col>
      <h4>Name</h4>
      <v-text-field outlined label="First name" v-model="firstName" />
      <v-text-field outlined label="Middle name" v-model="middleName" />
      <v-text-field outlined label="Last name" v-model="lastName" />
    </v-col>
    <v-col>
      <h4>Contact</h4>
      <v-text-field outlined label="Telephone" v-model="telephone" />
      <v-text-field outlined label="Email" v-model="email" />
      <v-text-field outlined label="Date of birth" v-model="dateOfBirth" />
    </v-col>
    <v-col>
        <h4>Address</h4>
      <v-row>
        <v-col class="pb-0">
          <v-text-field outlined label="Number" v-model="address.number" />  
        </v-col>
        <v-col class="pb-0">
          <v-text-field outlined label="Street" v-model="address.street" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-text-field outlined label="P.O. Box" v-model="address.pobox" />  
        </v-col>
        <v-col class="py-0">
          <v-text-field outlined label="Code" v-model="address.code" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-text-field outlined label="City" v-model="address.city" />  
        </v-col>
        <v-col class="py-0">
          <v-text-field outlined label="Country" v-model="address.country" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    firstName: '',
    middleName: '',
    lastName: '',
    telephone: '',
    email: '',
    dateOfBirth: '',
    address: {
      number: '',
      street: '',
      pobox: '',
      code: '',
      city: '',
      country: ''
    }
  })
}
</script>