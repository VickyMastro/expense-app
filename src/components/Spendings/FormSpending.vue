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
        <span style="padding-right: 40%">Crear gasto</span>
      </b-col>
    </b-row>

    <!-- fecha del gasto -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Fecha:</label>
      </b-col>
      <b-col sm="5">
        <b-form-input
          type="date"
          :value="spendingData.date"
          @input="(value) => $emit('setValue', 'date', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Titulo -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Titulo:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input
          :value="spendingData.title"
          @input="(value) => $emit('setValue', 'title', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Cuenta a la que va el gasto -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Cuenta:</label>
      </b-col>
      <b-col sm="3">
        <b-form-select
          :options="options"
          :value="spendingData.account_id"
          @input="(value) => $emit('setValue', 'account_id', value)"
        ></b-form-select>
      </b-col>

      <!-- Monto del ingreso -->
      <b-col sm="3">
        <label>Monto:</label>
      </b-col>
      <b-col sm="3">
        <b-form-input
          type="number"
          :value="spendingData.cash"
          @input="(value) => $emit('setValue', 'cash', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Boton -->
    <slot></slot>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FormSpending",
  props: ["spendingData"],
  methods: {
    redirectToHome() {
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["getCashboxes"]),
    options(){
      let cashboxes = [{ value: null, text: "Seleccionar cuenta" }];
      this.getCashboxes.forEach((cashbox) => {
        cashboxes.push({ value: cashbox.id, text: cashbox.name });
      });
      return cashboxes;
    }
  },
};
</script>

<style scoped>
.redirect-icon {
  cursor: pointer;
}
</style>
