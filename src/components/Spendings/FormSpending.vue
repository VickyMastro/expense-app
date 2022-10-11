<template>
    <b-container fluid class="mt-4">
      Crear gasto
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
  export default {
    name: "FormSpending",
    props: ["spendingData"],
    data() {
      return {
        options: [
          { value: "a", text: "Mercado Pago" },
          { value: "b", text: "BBVA" },
          { value: "c", text: "Billetera" },
        ],
      };
    },
  };
  </script>
  