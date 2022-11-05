<template>
  <b-modal
    id="NewCashboxModal"
    title="Crear una nueva caja"
    header-bg-variant="primary"
    header-text-variant="light"
    hide-footer
  >
    <b-container fluid>
      <b-row class="my-1" align-v="center">
        <b-col sm="4">
          <label>Saldo en caja: </label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="cashboxData.initial_balance"
            type="number"
            placeholder="Saldo"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1 mt-4" align-v="center">
        <b-col sm="4">
          <label>Banco: </label>
        </b-col>
        <b-col sm="8">
          <b-form-select
            v-model="cashboxData.icon_url"
            :options="setOptionsBanks"
          ></b-form-select>
        </b-col>
      </b-row>

      <b-row class="my-1 mt-4" align-v="center">
        <b-col sm="4">
          <label>Nombre de caja: </label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="cashboxData.name"
            placeholder="Nombre"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col class="d-flex justify-content-end">
          <button class="createButton" @click="createCashbox">
            Crear caja
          </button>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NewCashboxModal",
  data() {
    return {
      cashboxData: {
        icon_url: null,
        name: "",
        initial_balance: "",
      },
    };
  },
  methods: {
    async createCashbox() {
      if (
        !this.cashboxData.initial_balance ||
        !this.cashboxData.icon_url ||
        !this.cashboxData.name
      ) {
        this.$toast.warning("Completa todos los campos para crear la caja", {
          position: "top-right",
          duration: 4000,
        });
      } else {
        try {
          await this.$store.dispatch("createCashbox", this.cashboxData);
          this.$bvModal.hide("NewCashboxModal");
        } catch (error) {
          this.$toast.error("No fue posible crear la caja", {
            position: "top-right",
            duration: 4000,
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getBanks"]),
    setOptionsBanks() {
      let banks = [{ value: null, text: "Banco" }];
      this.getBanks.forEach((bank) => {
        banks.push({ value: bank.icon_url, text: bank.name });
      });
      return banks;
    },
  },
};
</script>

<style lang="scss" scoped>
.createButton {
  padding: 10px;
  color: white;
  background-color: var(--primary);

  font-size: 20px;

  border: none;
  border-radius: 5px;
}
</style>
