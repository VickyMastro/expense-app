<template>
  <b-container>
    <div v-if="Object.keys(incomesOrderByDate).length === 0" class="pt-2">
      <p>Aún no hay ingresos registrados</p>
    </div>

    <!--   [{income}, {income}], "2022-07-07, {2022-07-07: [{income}, {income}]}"] -->
    <div :key="key" v-for="(incomesDate, key) in incomesOrderByDate" v-else>
      <b-row>
        <b-col class="d-flex mt-2">
          <span>{{ getDaysNames(key) }}</span>
        </b-col>
      </b-row>

      <div
        class="container-income mt-2"
        :key="income.id"
        v-for="income in incomesDate"
        @click="editIncome(income.id)"
      >
        <b-row>
          <b-col cols="2">
            <b-icon
              style="margin-top: 15px"
              class="h3"
              icon="exclamation-circle-fill"
              variant="primary"
            ></b-icon>
          </b-col>
          <b-col cols="10">
            <b-row>
              <b-col cols="12">
                {{ income.title }}
              </b-col>
              <b-col cols="4" class="shorten-name d-flex justify-content-start">
                {{ income.accounts.name }}
              </b-col>
              <b-col cols="8" style="color: green">
                {{ amountFormatter(income.cash) }}
              </b-col>

              <b-icon
                class="button-delete-income h4"
                icon="x-circle"
                id="buttonDelete"
                @click.stop="deleteIncome(income.id)"
              ></b-icon>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { amountFormatter } from "@/utils/amountFormatter.js";
import { getDaysNames } from "@/utils/getDaysNames.js";

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
    getDaysNames,
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
.container-income {
  width: 70%;
  height: 60px;

  margin: 0 auto;

  background-color: rgb(138 123 165 / 20%);
  border-radius: 20px;
  box-shadow: rgb(138 123 165 / 69%) 0px 5px 15px;
}

.shorten-name {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.button-delete-income {
  background-color: white;
  border-radius: 25px;

  position: absolute;
  top: -10px;
  right: 8px;

  cursor: pointer;
}

@media (max-width: 767.98px) {
  .container-income {
    width: 90%;
  }
}
</style>
