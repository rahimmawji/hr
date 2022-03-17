<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field outlined label="Position" v-model="position" />
        <v-text-field outlined label="Department" v-model="department" />
      </v-col>
      <v-col>
        <v-text-field outlined label="Basic salary" v-model="basic" />
        <v-row>
          <v-col>
            <v-text-field outlined label="Allowance" v-model="allowance" />
          </v-col>
          <v-col>
            <v-text-field outlined label="Amount" v-model="amount" />
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn text>Add allowance</v-btn>
        </div>
      </v-col>
    </v-row>
    <!-- TODO: Add Salary history -->
    <!-- <v-row>
      <v-col>
        <h4>Salary history</h4>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Date</th>
                <th>Basic</th>
                <th>Allowances</th>
              </tr>
            </thead>
          </template>
        </v-simple-table>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    position: '',
    department: '',
    basic: '',
    allowance: '',
    amount: ''
  })
}
</script>