<template>
  <div>
    <v-row>
      <v-col>
        <h4 class="mb-1">Name</h4>
        <v-text-field
          outlined
          :disabled="!edit"
          label="First name"
          v-model="personal.firstName"
          @change="update('personal', null, 'firstName', personal.firstName)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="Middle name"
          v-model="personal.middleName"
          @change="update('personal', null, 'middleName', personal.middleName)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="Last name"
          v-model="personal.lastName"
          @change="update('personal', null, 'lastName', personal.lastName)"
        />
      </v-col>
      <v-col>
        <h4 class="mb-1">Contact</h4>
        <v-text-field
          outlined
          :disabled="!edit"
          label="Telephone"
          v-model="personal.telephone"
          @change="update('personal', null, 'telephone', personal.telephone)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="Email"
          v-model="personal.email"
          @change="update('personal', null, 'email', personal.email)"
        />
        <v-text-field
          outlined
          :disabled="!edit"
          label="Date of birth"
          v-model="personal.dateOfBirth"
          @change="
            update('personal', null, 'dateOfBirth', personal.dateOfBirth)
          "
        />
      </v-col>
      <v-col>
        <h4 class="mb-1">Address</h4>
        <v-row>
          <v-col class="pb-0">
            <v-text-field
              outlined
              :disabled="!edit"
              label="Number"
              v-model="personal.address.number"
              @change="
                update('personal', 'address', 'number', personal.address.number)
              "
            />
          </v-col>
          <v-col class="pb-0">
            <v-text-field
              outlined
              :disabled="!edit"
              label="Street"
              v-model="personal.address.street"
              @change="
                update('personal', 'address', 'street', personal.address.street)
              "
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              outlined
              :disabled="!edit"
              label="P.O. Box"
              v-model="personal.address.pobox"
              @change="
                update('personal', 'address', 'pobox', personal.address.pobox)
              "
            />
          </v-col>
          <v-col class="py-0">
            <v-text-field
              outlined
              :disabled="!edit"
              label="Code"
              v-model="personal.address.code"
              @change="
                update('personal', 'address', 'code', personal.address.code)
              "
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-text-field
              outlined
              :disabled="!edit"
              label="City"
              v-model="personal.address.city"
              @change="
                update('personal', 'address', 'city', personal.address.city)
              "
            />
          </v-col>
          <v-col class="py-0">
            <v-text-field
              outlined
              :disabled="!edit"
              label="Country"
              v-model="personal.address.country"
              @change="
                update(
                  'personal',
                  'address',
                  'country',
                  personal.address.country
                )
              "
            />
          </v-col>
        </v-row>
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
    loadingSave: false
  }),
  computed: {
    ...mapGetters("employees", ["personal"]),
  },
  methods: {
    ...mapMutations("employees", ["UPDATE_EMPLOYEE_DETAIL"]),
    ...mapActions("employees", ["updateEmployeeById"]),
    update(category, subcategory, property, value) {
      this.UPDATE_EMPLOYEE_DETAIL({ category, subcategory, property, value });
    },
    async editSave () {
      if (!this.edit) this.edit = true
      else {
        this.loadingSave = true
        await this.updateEmployeeById("personal")
        this.loadingSave = false
        this.edit = false
      }
    }
  },
};
</script>
