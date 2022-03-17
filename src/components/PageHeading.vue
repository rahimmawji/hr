<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title class="headline font-weight-light primary--text">
          <slot name="title" />
        </v-card-title>
        <v-card-text>
          <v-divider class="mb-2" />
          <slot name="body" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>