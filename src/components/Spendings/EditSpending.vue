<template>
  <FormSpending :spendingData="spendingData" @setValue="setValue">
    <b-row class="mt-5">
      <b-col class="pb-2">
        <b-button
          variant="outline-primary"
          size="md"
          @click="editSpendingButton"
        >
          Editar gasto
        </b-button>
      </b-col>
    </b-row>
  </FormSpending>
</template>

<script>
import FormSpending from "@/components/Spendings/FormSpending";

export default {
  name: "EditSpending",
  async mounted() {
    const response = await this.$store.dispatch(
      "getSpending",
      this.$route.params.id
    );
    for (let propertyName in this.spendingData) {
      this.spendingData[propertyName] = response[propertyName];
    }
  },
  data() {
    return {
      spendingData: {
        title: "",
        account_id: 1,
        cash: "",
        date: "",
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.spendingData[name] = value;
    },

    async editSpendingButton() {
      try {
        await this.$store.dispatch("editSpending", {
          spendingData: this.spendingData,
          id: this.$route.params.id,
        });
        this.$router.push("/");
      } catch (error) {
        console.log("error al editar en spending", error);
      }
    },
  },
  components: {
    FormSpending,
  },
};
</script>
