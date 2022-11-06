<template>
  <FormSpending :spendingData="spendingData" :titleMovement="titleMovement" @setValue="setValue">
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
    try {
      const response = await this.$store.dispatch(
        "getSpending",
        this.$route.params.id
      );
      for (let propertyName in this.spendingData) {
        this.spendingData[propertyName] = response[propertyName];
      }
    } catch (error) {
      this.$router.push("/");
      this.$toast.error("No fue posible abrir el gasto", {
        position: "top-right",
        duration: 4000,
      });
    }
  },
  data() {
    return {
      titleMovement: "Editar gasto",
      spendingData: {
        title: "",
        account_id: null,
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
      if (
        !this.spendingData.title ||
        !this.spendingData.account_id ||
        !this.spendingData.cash
      ) {
        this.$toast.warning("Completa todos los campos para editar el gasto", {
          position: "top-right",
          duration: 4000,
        });
      } else {
        try {
          await this.$store.dispatch("editSpending", {
            spendingData: this.spendingData,
            id: this.$route.params.id,
          });
          this.$router.push("/");
        } catch (error) {
          this.$toast.error("No fue posible editar el gasto", {
            position: "top-right",
            duration: 4000,
          });
        }
      }
    },
  },
  components: {
    FormSpending,
  },
};
</script>
