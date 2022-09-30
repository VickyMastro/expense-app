<template>
  <div>
    <b-button
      class="text-decoration-none"
      variant="link"
      @click="changeView('ShowIncomes')"
    >
      Ingresos
    </b-button>
    |
    <b-button
      class="text-decoration-none"
      variant="link"
      @click="changeView('ShowSpendings')"
    >
      Egresos
    </b-button>
    <component :is="componentToShow"></component>
  </div>
</template>

<script>
import ShowIncomes from "../components/Incomes/ShowIncomes.vue";
import ShowSpendings from "../components/Spendings/ShowSpendings.vue";

export default {
  name: "Movements",
  data() {
    return {
      componentToShow: "ShowIncomes",
    };
  },
  methods: {
    changeView(componentName) {
        this.componentToShow = componentName
    },
  },
  components: {
    ShowIncomes,
    ShowSpendings,
  },
};
</script>
