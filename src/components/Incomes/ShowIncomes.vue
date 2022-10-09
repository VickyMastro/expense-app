<template>
  <b-container>
    <!--   [{income}, {income}], "2022-07-07, {2022-07-07: [{income}, {income}]}"] -->
    <div :key="key" v-for="(incomesDate, key) in incomesOrderByDate">
     <b-row>
      <b-col class="d-flex mt-2">
        <span>{{key}}</span>
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

      <b-col style="border: 1px solid #7c59bc" cols="6" @click="editIncome(income.id)">
        <b-row>
          <b-col cols="12" class="d-flex justify-content-center">
            {{ income.title }}
          </b-col>
          <b-col cols="6"> BBVA </b-col>
          <b-col cols="6"> {{ income.cash }} </b-col>
        </b-row>
      </b-col>

      <b-col
        class="d-flex justify-content-center align-items-center"
        style="border: 1px solid #7c59bc"
        cols="1"
      >
        <b-icon class="h4" icon="x-circle" id="buttonDelete" @click.stop="deleteIncome(income.id)"></b-icon>
      </b-col>
    </b-row>
    </div>

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
    ...mapGetters(["incomesOrderByDate"]),
  },
};
</script>

<style scoped></style>