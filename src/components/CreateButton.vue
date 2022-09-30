<template>
  <fab
    :position="position"
    :bg-color="bgColor"
    :actions="fabActions"
    fixed-tooltip="tooltip"
    @income="createIncome"
    @agress="createEgress"
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
          tooltip: 'Agregar ingreso',
        },
        {
          name: "agress",
          icon: "shopping_bag",
          tooltip: 'Agregar gasto',
        },
      ],
    };
  },
  methods: {
    createIncome() {
      this.$router.push("/createIncome");
    },
    createEgress() {
      this.$router.push("/createSpending");
    },
  },
  components: {
    fab,
  },
};
</script>
