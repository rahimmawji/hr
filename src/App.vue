<template>
  <v-app>
    <v-app-bar app color="white">
      <v-spacer />
      <v-btn text to="/employees">Employees</v-btn>
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
