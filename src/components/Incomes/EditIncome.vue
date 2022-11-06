<template>
  <FormIncome :incomeData="incomeData" :titleMovement="titleMovement" @setValue="setValue">
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
    try {
      const response = await this.$store.dispatch(
        "getIncome",
        this.$route.params.id
      );
      for (let propertyName in this.incomeData) {
        this.incomeData[propertyName] = response[propertyName];
      }
    } catch (error) {
      this.$router.push("/");
      this.$toast.error("No fue posible abrir el ingreso", {
        position: "top-right",
        duration: 4000,
      });
    }
  },
  data() {
    return {
      titleMovement: "Editar ingreso",
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
      if (
        !this.incomeData.title ||
        !this.incomeData.account_id ||
        !this.incomeData.cash
      ) {
        this.$toast.warning(
          "Completa todos los campos para editar el ingreso",
          {
            position: "top-right",
            duration: 4000,
          }
        );
      } else {
        try {
          await this.$store.dispatch("editIncome", {
            incomeData: this.incomeData,
            id: this.$route.params.id,
          });
          this.$router.push("/");
        } catch (error) {
          this.$toast.error("No fue posible editar el ingreso", {
            position: "top-right",
            duration: 4000,
          });
        }
      }
    },
  },
  components: {
    FormIncome,
  },
};
</script>
