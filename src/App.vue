<template>
  <v-app>
    <v-app-bar app color="white">
      <v-spacer />
      <v-btn text active-class="primary" class="mr-2" to="/employees">Employees</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs}">
          <v-btn text class="mr-2" v-on="on" v-bind="attrs">Manage <v-icon right>mdi-chevron-down</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-item to="/advances">
            <v-list-item-title>Advances</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text active-class="primary" to="/payroll">Payroll</v-btn>
    </v-app-bar>
    <v-main>
      <router-view class="pa-4"/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App'
};
</script>
