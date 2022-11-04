<template>
  <b-container>
    <div v-if="Object.keys(spendingsOrderByDate).length === 0" class="pt-2">
      <p>Aún no hay gastos registrados</p>
    </div>
    <!--   [{spending}, {spending}], "2022-07-07, {2022-07-07: [{spending}, {spending}]}"] -->
    <div :key="key" v-for="(spendingDate, key) in spendingsOrderByDate" v-else>
      <b-row>
        <b-col class="d-flex mt-2">
          <span>{{ key }}</span>
        </b-col>
      </b-row>
      <b-row
        class="mt-2"
        style="height: 60px"
        align-h="center"
        :key="spending.id"
        v-for="spending in spendingDate"
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
          @click="redirectToEditSpending(spending.id)"
        >
          <b-row>
            <b-col cols="12" class="d-flex justify-content-center">
              {{ spending.title }}
            </b-col>
            <b-col cols="6"> BBVA </b-col>
            <b-col cols="6"> {{ amountFormatter(spending.cash) }} </b-col>
          </b-row>
        </b-col>

        <b-col
          class="d-flex justify-content-center align-items-center"
          style="border: 1px solid #7c59bc"
          cols="1"
        >
          <b-icon
            class="h4"
            icon="x-circle"
            id="buttonDelete"
            @click.stop="deleteSpending(spending.id)"
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
  name: "ShowSpendings",
  async mounted() {
    await this.$store.dispatch("getSpendings");
  },
  methods: {
    amountFormatter,
    redirectToEditSpending(spendingId) {
      this.$router.push({ name: "EditSpending", params: { id: spendingId } });
    },

    async deleteSpending(spendingId) {
      await this.$store.dispatch("deleteSpending", spendingId);
    },
  },
  computed: {
    ...mapGetters(["spendingsOrderByDate"]),
  },
};
</script>

<style scoped></style>
