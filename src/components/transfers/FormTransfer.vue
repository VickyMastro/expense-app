<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="3">
        <b-icon
          class="redirect-icon h3 mt-2"
          icon="arrow-left-short"
          variant="dark"
          @click="redirectToHome"
        ></b-icon>
      </b-col>
      <b-col cols="9" align-self="center">
        <span style="padding-right: 40%">{{ titleMovement }}</span>
      </b-col>
    </b-row>

    <!-- fecha del ingreso -->
    <b-row class="mt-4" align-v="center">
      <b-col cols="3" md="3">
        <label>Fecha:</label>
      </b-col>
      <b-col cols="4" md="3">
        <b-form-input
          type="date"
          :value="transferData.date"
          @input="(value) => $emit('setValue', 'date', value)"
        ></b-form-input>
      </b-col>

      <b-col cols="2" md="3">
        <label>Monto:</label>
      </b-col>
      <b-col cols="3" md="3">
        <b-form-input
          type="number"
          :value="transferData.cash"
          @input="(value) => $emit('setValue', 'cash', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Titulo -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Titulo:</label>
      </b-col>
      <b-col sm="5">
        <b-form-input
          :value="transferData.title"
          @input="(value) => $emit('setValue', 'title', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Cuenta donde sale el dinero -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>De la cuenta:</label>
      </b-col>
      <b-col sm="4">
        <b-form-select
          :options="options"
          :value="transferData.from_account_id"
          @input="(value) => $emit('setValue', 'from_account_id', value)"
        ></b-form-select>
      </b-col>
    </b-row>

    <!-- Cuenta donde entra el dinero -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>A la cuenta:</label>
      </b-col>
      <b-col sm="4">
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
    redirectToHome() {
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["getCashboxes"]),
    options() {
      let cashboxes = [{ value: null, text: "Seleccionar cuenta" }];
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
