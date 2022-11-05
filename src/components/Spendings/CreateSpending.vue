<template>
  <FormSpending :spendingData="spendingData" @setValue="setValue">
    <b-row class="mt-5">
      <b-col class="pb-2">
        <b-button variant="outline-primary" size="md" @click="addSpending">
          Agregar gasto
        </b-button>
      </b-col>
    </b-row>
  </FormSpending>
</template>

<script>
import FormSpending from "@/components/Spendings/FormSpending.vue";

export default {
  name: "CreateSpending",
  mounted() {
    this.spendingData.date = new Date().toISOString().split("T")[0];
  },
  data() {
    return {
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

    async addSpending() {
      if (
        !this.spendingData.title ||
        !this.spendingData.account_id ||
        !this.spendingData.cash
      ) {
        this.$toast.warning("Completa todos los campos para crear un gasto", {
          position: "top-right",
          duration: 4000,
        });
      } else {
        try {
          await this.$store.dispatch("createSpending", this.spendingData);
          this.$router.push("/");
        } catch (error) {
          this.$toast.error("No fue posible crear el gasto", {
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
