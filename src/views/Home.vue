<template>
  <b-container fluid class="bv-example-row ">
    <b-row class="row-container-home">
      <b-col md="4" style="background-color: grey;">
        <Sidebar />
      </b-col>
      <b-col>
        <CreateButton />
        <router-view />
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import CreateButton from "../components/CreateButton.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
    CreateButton, 
  },
};
</script>

<style scoped>
.row-container-home{
  height: 100vh;
}
</style>