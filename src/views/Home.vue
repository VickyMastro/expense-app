<template>
  <b-container fluid>
    <b-row class="container-home" v-if="!getUser">
      <b-col>
        <router-view />
      </b-col>
    </b-row>

    <b-row class="container-home" v-else >
      <b-col md="4" style="background-color: var(--primary);">
        <Sidebar />
      </b-col>
      <b-col md="8" >
        <CreateButton />
        <router-view />
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

import Sidebar from "../components/Sidebar.vue";
import CreateButton from "../components/CreateButton.vue";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["getUser"]),
  },
  components: {
    Sidebar,
    CreateButton, 
  },
};
</script>

<style scoped>
.container-home{
  height: 100vh;
}
</style>