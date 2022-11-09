<template>
  <fab
    :position="position"
    :bg-color="bgColor"
    :actions="fabActions"
    fixed-tooltip="tooltip"
    @income="createIncome"
    @agress="createSpending"
    @transfer="createTransfer"
  >
  </fab>
</template>

<script>
import fab from "vue-fab";

export default {
  name: "CreateSpending",
  data() {
    return {
      bgColor: "#7C59BC",
      position: "bottom-right",
      fabActions: [
        {
          name: "income",
          icon: "payments",
          tooltip: "Agregar ingreso",
        },
        {
          name: "agress",
          icon: "shopping_bag",
          tooltip: "Agregar gasto",
        },
        {
          name: "transfer",
          icon: "sync_alt",
          tooltip: "Transferencia",
        },
      ],
    };
  },
  methods: {
    createIncome() {
      if (this.$route.path !== "/createIncome") {
        this.$router.push({name: "CreateIncome"});
      }
    },
    createSpending() {
      if (this.$route.path !== "/createSpending") {
        this.$router.push({name: "CreateSpending"});
      }
    },
    createTransfer() {
      console.log("creando transferencia");
    },
  },
  components: {
    fab,
  },
};
</script>
