<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <b-icon
          class="redirect-icon h3 mt-2"
          icon="arrow-left-short"
          variant="dark"
          @click="redirect"
        ></b-icon>
      </b-col>
      <b-col cols="9" align-self="center">
        <span style="padding-right: 40%">{{ titleMovement }}</span>
      </b-col>
    </b-row>

    <!-- fecha de la transferencia -->
    <b-row class="mt-4" align-v="center" align-h="center">
      <b-col cols="7" md="4">
        <b-form-input
          type="date"
          :value="transferData.date"
          @input="(value) => $emit('setValue', 'date', value)"
        ></b-form-input>
      </b-col>

      <!-- Monto a transferir -->
      <b-col cols="5" md="3">
        <money
          class="form-control"
          :value="transferData.cash"
          @input="(value) => $emit('setValue', 'cash', value)"
        ></money>
      </b-col>
    </b-row>

    <!-- Titulo -->
    <b-row class="mt-4" align-v="center" align-h="center">
      <b-col cols="3" md="3">
        <label>Titulo:</label>
      </b-col>
      <b-col cols="9" md="4">
        <b-form-input
          :value="transferData.title"
          @input="(value) => $emit('setValue', 'title', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Cuenta donde sale el dinero -->
    <b-row class="mt-4" align-v="center" align-h="center">
      <b-col cols="5" md="3" lg="2">
        <b-form-select
          :options="options"
          :value="transferData.from_account_id"
          @input="(value) => $emit('setValue', 'from_account_id', value)"
        ></b-form-select>
      </b-col>

      <b-col cols="2" md="2" lg="2">
        <span class="material-icons"> sync_alt </span>
      </b-col>
      <!-- Cuenta donde entra el dinero -->
      <b-col cols="5" md="3" lg="2">
        <b-form-select
          :options="options"
          :value="transferData.to_account_id"
          @input="(value) => $emit('setValue', 'to_account_id', value)"
        ></b-form-select>
      </b-col>
    </b-row>

    <!-- Boton -->
    <slot></slot>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FormTransfer",
  props: ["transferData", "titleMovement"],
  methods: {
    redirect() {
      this.$router.push({ name: "ShowTransfers" });
    },
  },
  computed: {
    ...mapGetters(["getCashboxes"]),
    options() {
      let cashboxes = [{ value: null, text: "Cuenta" }];
      this.getCashboxes.forEach((cashbox) => {
        cashboxes.push({ value: cashbox.id, text: cashbox.name });
      });
      return cashboxes;
    },
  },
};
</script>

<style scoped>
.redirect-icon {
  cursor: pointer;
}
</style>
