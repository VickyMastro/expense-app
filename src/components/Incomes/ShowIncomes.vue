<template>
  <b-container>
    <b-row
      class="mt-2"
      style="height: 60px"
      @click="editIncome(income.id)"
      :key="income.id"
      v-for="income in incomes"
    >
      <b-col
        class="d-flex justify-content-center align-items-center"
        style="border: 1px solid #7c59bc"
      >
        <b-icon
          class="h3"
          icon="exclamation-circle-fill"
          variant="info"
        ></b-icon>
      </b-col>

      <b-col style="border: 1px solid #7c59bc" cols="7">
        <b-row>
          <b-col lg="12" class="d-flex justify-content-center">
            {{ income.title }}
          </b-col>
          <b-col lg="6" md="6"> {{ income.account }} </b-col>
          <b-col lg="6" md="6"> {{ income.cash }} </b-col>
        </b-row>
      </b-col>

      <b-col
        class="d-flex justify-content-center align-items-center"
        style="border: 1px solid #7c59bc"
      >
        {{ income.date }}
        <b-icon class="h4" icon="x-circle" id="buttonDelete" @click.stop="deleteIncome(income.id)"></b-icon>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShowIncome",
  mounted() {
    this.$store.dispatch("getIncomes");
  },
  methods: {
    editIncome(incomeId) {
      this.$router.push({ name: "EditIncome", params: { id: incomeId } });
    },

    deleteIncome(incomeId){
      this.$store.dispatch("deleteIncome", incomeId)
    },
  },
  computed: {
    ...mapGetters(["incomes"]),
  },
};
</script>

<style scoped></style>