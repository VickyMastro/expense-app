<template>
  <b-container>
    <div v-if="Object.keys(incomesOrderByDate).length === 0" class="pt-2">
      <p>Aún no hay ingresos registrados</p>
    </div>

    <!--   [{income}, {income}], "2022-07-07, {2022-07-07: [{income}, {income}]}"] -->
    <div :key="key" v-for="(incomesDate, key) in incomesOrderByDate" v-else>
      <b-row>
        <b-col class="d-flex mt-2">
          <span>{{ key }}</span>
        </b-col>
      </b-row>
      <b-row
        class="mt-2"
        style="height: 60px"
        align-h="center"
        :key="income.id"
        v-for="income in incomesDate"
      >
        <b-col
          class="d-flex justify-content-center align-items-center"
          style="border: 1px solid #7c59bc"
          cols="1"
        >
          <b-icon
            class="h3"
            icon="exclamation-circle-fill"
            variant="info"
          ></b-icon>
        </b-col>

        <b-col
          style="border: 1px solid #7c59bc"
          cols="6"
          @click="editIncome(income.id)"
        >
          <b-row>
            <b-col cols="12" class="d-flex justify-content-center">
              {{ income.title }}
            </b-col>
            <b-col cols="6"> {{ income.accounts.name }} </b-col>
            <b-col cols="6"> {{ amountFormatter(income.cash) }} </b-col>
          </b-row>
        </b-col>

        <b-col
          class="d-flex justify-content-center align-items-center"
          style="border: 1px solid #7c59bc"
          cols="1"
        >
          <b-icon
            class="button-delete-income h4"
            icon="x-circle"
            id="buttonDelete"
            @click.stop="deleteIncome(income.id)"
          ></b-icon>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { amountFormatter } from "@/utils/amountFormatter.js";

export default {
  name: "ShowIncome",
  async mounted() {
    try {
      await this.$store.dispatch("getIncomes");
    } catch (error) {
      this.$toast.error("No fue posible encontrar los ingresos", {
        position: "top-right",
        duration: 4000,
      });
    }
  },
  methods: {
    amountFormatter,
    editIncome(incomeId) {
      this.$router.push({ name: "EditIncome", params: { id: incomeId } });
    },

    async deleteIncome(incomeId) {
      try {
        await this.$store.dispatch("deleteIncome", incomeId);
        await this.$store.dispatch("searchCashboxes");
      } catch (error) {
        this.$toast.error("No fue posible eliminar el ingreso", {
          position: "top-right",
          duration: 4000,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["incomesOrderByDate"]),
  },
};
</script>

<style scoped>
.button-delete-income {
  cursor: pointer;
}
</style>
