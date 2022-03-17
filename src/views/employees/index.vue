<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline font-weight-light primary--text">
            Employees
            <v-spacer />
            <v-text-field label="Search" prepend-inner-icon="mdi-magnify" hide-details />
            <v-spacer />
            <v-btn color="primary" @click="drawer = true">
              <v-icon left>mdi-plus</v-icon>
              New employee
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-2" />
            <ul>
              <li v-for="employee in employees" :key="employee.id">{{ employee.name }}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-navigation-drawer v-model="drawer" absolute temporary right width="500">
      <h3 class="headline font-weight-light primary--text pa-4">Add a new employee</h3>
      <v-divider />
      <h4 class="pa-4 error--text">All of the fields below are required:</h4>
      <v-row class="pa-4">
        <v-col>
          <v-text-field outlined label="First name" v-model="firstName" />
          <v-text-field outlined label="Last name" v-model="lastName" />
          <v-text-field outlined label="Date of birth" v-model="dateOfBirth" />
          <v-text-field outlined label="Telephone" v-model="telephone" />
        </v-col>
        <v-col>
          <v-text-field outlined label="ID #" v-model="id" />
          <v-text-field outlined label="Position" v-model="position" />
          <v-text-field outlined label="Basic Salary" v-model="basic" />
          <v-text-field outlined label="Start date" v-model="start" />
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn color="primary" to="/employee">Add</v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    telephone: '',
    id: '',
    position: '',
    basic: '',
    start: '',
    employees: [
      { id: 1, name: "Rahim Mawji" },
      { id: 2, name: "Ismail Mawji" },
      { id: 3, name: "Nazira Mawji" },
      { id: 4, name: "Shoira Mawji" },
    ]
  })
}
</script>