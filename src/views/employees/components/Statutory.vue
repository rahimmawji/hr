<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          :disabled="!edit"
          label="ID"
          v-model="statutory.id"
          @change="update('statutory', null, 'id', statutory.id)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="PIN"
          v-model="statutory.pin"
          @change="update('statutory', null, 'pin', statutory.pin)"
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          :disabled="!edit"
          label="NHIF"
          v-model="statutory.nhif"
          @change="update('statutory', null, 'nhif', statutory.nhif)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="NSSF"
          v-model="statutory.nssf"
          @change="update('statutory', null, 'nssf', statutory.nssf)"
        />
      </v-col>
    </v-row>
    <div class="text-right">
      <v-btn
        :color="edit ? 'success' : 'warning'"
        @click="editSave"
        v-html="edit ? 'Save' : 'Edit'"
        :loading="loadingSave"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    edit: false,
    loadingSave: false,
  }),
  computed: {
    ...mapGetters("employees", ["statutory"]),
  },
  methods: {
    ...mapMutations("employees", ["UPDATE_EMPLOYEE_DETAIL"]),
    ...mapActions("employees", ["updateEmployeeById"]),
    update(category, subcategory, property, value) {
      this.UPDATE_EMPLOYEE_DETAIL({ category, subcategory, property, value });
    },
    async editSave() {
      if (!this.edit) this.edit = true;
      else {
        this.loadingSave = true;
        await this.updateEmployeeById("statutory");
        this.loadingSave = false;
        this.edit = false;
      }
    },
  },
};
</script>
