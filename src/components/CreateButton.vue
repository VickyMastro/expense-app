<template>
  <fab
    :position="position"
    :bg-color="bgColor"
    :actions="fabActions"
    @income="addIncome"
    @agress="addEgress"
  >
  </fab>
</template>

<script>
import fab from "vue-fab";
export default {
  name: "CreateSpending",
  data() {
    return {
      bgColor: "#778899",
      position: "bottom-right",
      fabActions: [
        {
          name: "income",
          icon: "cached",
        },
        {
          name: "agress",
          icon: "add_alert",
        },
      ],
    };
  },
  methods: {
    addIncome() {
      console.log("ingreso");
    },
    addEgress() {
      console.log("egreso");
      this.$router.push("/createSpending")
    },
  },
  components: {
    fab,
  },
};
</script>
