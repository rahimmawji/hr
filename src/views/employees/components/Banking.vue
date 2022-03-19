<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          :disabled="!edit"
          label="Account Name"
          v-model="bank.accountName"
          @change="update('bank', null, 'accountName', bank.accountName)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="Account Number"
          v-model="bank.accountNumber"
          @change="update('bank', null, 'accountNumber', bank.accountNumber)"
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          :disabled="!edit"
          label="Bank"
          v-model="bank.bank"
          @change="update('bank', null, 'bank', bank.bank)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="Bank Code"
          v-model="bank.bankCode"
          @change="update('bank', null, 'bankCode', bank.bankCode)"
        />
      </v-col>
      <v-col>
        <v-text-field
          outlined
          :disabled="!edit"
          label="Branch"
          v-model="bank.branch"
          @change="update('bank', null, 'branch', bank.branch)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="Branch Code"
          v-model="bank.branchCode"
          @change="update('bank', null, 'branchCode', bank.branchCode)"
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
    ...mapGetters("employees", ["bank"]),
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
        await this.updateEmployeeById("bank");
        this.loadingSave = false;
        this.edit = false;
      }
    },
  },
};
</script>
