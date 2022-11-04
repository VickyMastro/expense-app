<template>
  <FormIncome :incomeData="incomeData" @setValue="setValue">
    <b-row class="mt-5">
      <b-col class="pb-2">
        <b-button variant="outline-primary" size="md" @click="editIncome">
          Editar ingreso
        </b-button>
      </b-col>
    </b-row>
  </FormIncome>
</template>

<script>
import FormIncome from "@/components/Incomes/FormIncome";

export default {
  name: "EditIncome",
  async mounted() {
    const response = await this.$store.dispatch(
      "getIncome",
      this.$route.params.id
    );
    for (let propertyName in this.incomeData) {
      this.incomeData[propertyName] = response[propertyName];
    }
  },
  data() {
    return {
      incomeData: {
        title: "",
        account_id: null,
        cash: "",
        date: "",
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.incomeData[name] = value;
    },

    async editIncome() {
      try {
        await this.$store.dispatch("editIncome", {
          incomeData: this.incomeData,
          id: this.$route.params.id,
        });
        this.$router.push("/");
      } catch (error) {
        console.log("error en create", error);
      }
    },
  },
  components: {
    FormIncome,
  },
};
</script>
