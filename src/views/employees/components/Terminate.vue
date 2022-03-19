<template>
  <v-row>
    <v-col offset="4" cols="4">
      <v-form ref="terminateForm" v-model="terminateFormValid" @submit.prevent="terminate">
              <v-text-field outlined label="Termination date" v-model="end" :rules="required" />
      <div class="text-center">
        <v-btn color="error" :loading="loadingTerminate" type="submit">Terminate</v-btn>
      </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    end: '',
    loadingTerminate: false,
    terminateFormValid: true,
    required: [(v) => !!v || 'Required']
  }),
  methods: {
    async terminate() {
      if (this.$refs.terminateForm.validate()) {
        this.loadingTerminate = true
        await this.$store.dispatch('employees/terminateEmployee', this.end)
        this.loadingTerminate = false
        this.$router.push('/employees')
      }
    }
  }
}
</script>