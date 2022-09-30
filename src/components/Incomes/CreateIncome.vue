<template>
  <FormIncome :incomeData="incomeData" @setValue="setValue">
    <b-row class="mt-5">
      <b-col class="pb-2">
        <b-button variant="outline-primary" size="md" @click="addIncome">
          Agregar ingreso
        </b-button>
      </b-col>
    </b-row>
  </FormIncome>
</template>

<script>
import FormIncome from "@/components/Incomes/FormIncome";

export default {
  name: "CreateIncome",
  data() {
    return {
      incomeData: {
        title: "",
        account_id: 1,
        cash: "",
        date: "",
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.incomeData[name] = value;
    },

    async addIncome() {
      try {
        await this.$store.dispatch("createIncome", this.incomeData);
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
