<template>
  <div>
    <v-row>
    <v-col>
      <v-text-field outlined label="ID" v-model="statutory.id" @change="update('statutory', null, 'id', statutory.id)" />
      <v-text-field outlined label="PIN" v-model="statutory.pin" @change="update('statutory', null, 'pin', statutory.pin)" />
    </v-col>
    <v-col>
      <v-text-field outlined label="NHIF" v-model="statutory.nhif" @change="update('statutory', null, 'nhif', statutory.nhif)" />
      <v-text-field outlined label="NSSF" v-model="statutory.nssf" @change="update('statutory', null, 'nssf', statutory.nssf)" />
    </v-col>
  </v-row>
      <div class="text-right">
      <v-btn
        :color="edit ? 'success' : 'warning'"
        @click="edit = !edit"
        v-html="edit ? 'Save' : 'Edit'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    edit: false,
  }),
  computed: {
    ...mapGetters("employees", ["statutory"])
  },
  methods: {
    ...mapMutations("employees", ["UPDATE_EMPLOYEE_DETAIL"]),
    update(category, subcategory, property, value) {
      this.UPDATE_EMPLOYEE_DETAIL({ category, subcategory, property, value })
    }
  }
}
</script>