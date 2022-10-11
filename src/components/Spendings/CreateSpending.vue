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
// import { mapActions } from "vuex";

export default {
  name: "CreateSpending",
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
    // ...mapActions({
    //   createSpending: "spendingsModule/createSpending",
    // }),
    
    setValue(name, value) {
      this.spendingData[name] = value;
    },

    async addSpending() {
      try {
        await this.$store.dispatch("createSpending", this.spendingData);
        this.$router.push("/");
      } catch (error) {
        console.log("error en create", error);
      }
    },
  },
  components: {
    FormSpending,
  },
};
</script>
