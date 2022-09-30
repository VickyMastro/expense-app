<template>
  <b-container fluid class="bv-example-row ">
    <b-row class="row-container-home" v-if="!getUser">
      <b-col>
        <Login />
      </b-col>
    </b-row>

    <b-row class="row-container-home" v-else >
      <b-col md="4" style="background-color: #7C59BC;">
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
import { mapGetters } from "vuex";

import Login from "../views/Login.vue";
import Sidebar from "../components/Sidebar.vue";
import CreateButton from "../components/CreateButton.vue";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["getUser"]),
  },
  components: {
    Login,
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