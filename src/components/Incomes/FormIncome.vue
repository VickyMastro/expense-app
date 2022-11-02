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
        <span style="padding-right: 40%">Crear ingreso</span>  
      </b-col>
    </b-row>

    <!-- fecha del ingreso -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Fecha:</label>
      </b-col>
      <b-col sm="5">
        <b-form-input
          type="date"
          :value="incomeData.date"
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
          :value="incomeData.title"
          @input="(value) => $emit('setValue', 'title', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Cuenta a la que va el ingreso -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Cuenta:</label>
      </b-col>
      <b-col sm="3">
        <b-form-select
          :options="options"
          :value="incomeData.account_id"
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
          :value="incomeData.cash"
          @input="(value) => $emit('setValue', 'cash', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Boton -->
    <slot></slot>
  </b-container>
</template>

<script>
export default {
  name: "FormIncome",
  props: ["incomeData"],
  data() {
    return {
      options: [
        { value: "a", text: "Mercado Pago" },
        { value: "b", text: "BBVA" },
        { value: "c", text: "Billetera" },
      ],
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.redirect-icon{
  cursor: pointer;
}
</style>