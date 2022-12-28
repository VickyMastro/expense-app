<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  name: "App",
  async mounted() {
    await this.$store.dispatch("searchBanks");
    await this.$store.dispatch("searchCashboxes");
  },
  async created() {
    await this.$store.dispatch("getCurrentUser");
  },
  components: {
    Home,
  },
};
</script>

<style lang="scss">
@import "./scss/custom.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
