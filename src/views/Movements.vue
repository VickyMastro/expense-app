<template>
  <div>
    <Cashboxes />
    <div class="mt-3">
      <span
        class="movements-buttons"
        :class="{'underline': componentToShow=='ShowIncomes',}"
        @click="changeView('ShowIncomes')"
      >
        Ingresos
      </span>
      |
      <span
        class="movements-buttons"
        :class="{'underline': componentToShow=='ShowSpendings',}"
        @click="changeView('ShowSpendings')"
      >
        Gastos
      </span>
    </div>
    <component :is="componentToShow"></component>
  </div>
</template>

<script>
import Cashboxes from "../components/cashboxes/Cashboxes.vue";
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
      this.componentToShow = componentName;
    },
  },
  components: {
    Cashboxes,
    ShowIncomes,
    ShowSpendings,
  },
};
</script>

<style scoped>
.movements-buttons{
  font-size: 28px;
  color: rgb(138 123 165);
  cursor: pointer;
}
.underline{
  color: rgb(124 89 188);
}
</style>
