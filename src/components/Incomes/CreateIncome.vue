<template>
  <FormIncome :incomeData="incomeData" :titleMovement="titleMovement" @setValue="setValue">
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
  mounted() {
    this.incomeData.date = new Date().toISOString().split("T")[0];
  },
  data() {
    return {
      titleMovement: "Crear ingreso",
      incomeData: {
        title: "",
        account_id: null,
        cash: "",
        date: "",
        category_id: null,
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.incomeData[name] = value;
    },

    async addIncome() {
      if (
        !this.incomeData.title ||
        !this.incomeData.account_id ||
        !this.incomeData.cash
      ) {
        this.$toast.warning("Completa todos los campos para crear el ingreso", {
          position: "top-right",
          duration: 4000,
        });
      } else {
        try {
          await this.$store.dispatch("createIncome", this.incomeData);
          this.$router.push("/");
        } catch (error) {
          this.$toast.error("No fue posible crear el ingreso", {
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
