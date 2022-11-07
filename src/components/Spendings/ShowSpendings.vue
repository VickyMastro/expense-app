<template>
  <b-container>
    <div v-if="Object.keys(spendingsOrderByDate).length === 0" class="pt-2">
      <p>Aún no hay gastos registrados</p>
    </div>
    <!--   [{spending}, {spending}], "2022-07-07, {2022-07-07: [{spending}, {spending}]}"] -->
    <div :key="key" v-for="(spendingDate, key) in spendingsOrderByDate" v-else>
      <b-row>
        <b-col class="d-flex mt-2">
          <span>{{ getDaysNames(key) }}</span>
        </b-col>
      </b-row>

      <div
        class="container-spending mt-2"
        :key="spending.id"
        v-for="spending in spendingDate"
        @click="editSpending(spending.id)"
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
                {{ spending.title }}
              </b-col>
              <b-col cols="4" class="shorten-name d-flex justify-content-start">
                {{ spending.accounts.name }}
              </b-col>
              <b-col cols="8" style="color: red">
               - {{ amountFormatter(spending.cash) }}
              </b-col>

              <b-icon
                class="button-delete-spending h4"
                icon="x-circle"
                id="buttonDelete"
                @click.stop="deleteSpending(spending.id)"
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
  name: "ShowSpendings",
  async mounted() {
    try {
      await this.$store.dispatch("getSpendings");
    } catch (error) {
      this.$toast.error("No fue posible encontrar los gastos", {
        position: "top-right",
        duration: 4000,
      });
    }
  },
  methods: {
    getDaysNames,
    amountFormatter,
    editSpending(spendingId) {
      this.$router.push({ name: "EditSpending", params: { id: spendingId } });
    },

    async deleteSpending(spendingId) {
      try {
        await this.$store.dispatch("deleteSpending", spendingId);
        await this.$store.dispatch("searchCashboxes");
      } catch (error) {
        this.$toast.error("No fue posible eliminar el gasto", {
          position: "top-right",
          duration: 4000,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["spendingsOrderByDate"]),
  },
};
</script>

<style scoped>
.container-spending {
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
.button-delete-spending {
  background-color: white;
  border-radius: 25px;

  position: absolute;
  top: -10px;
  right: 8px;
  
  cursor: pointer;
}

@media (max-width: 767.98px) {
  .container-spending {
    width: 90%;
  }
}
</style>
