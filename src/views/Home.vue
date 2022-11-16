<template>
  <b-container fluid>
    <b-row class="container-home" v-if="!getUser">
      <b-col style="padding: 0px">
        <router-view />
      </b-col>
    </b-row>

    <b-row class="container-home" v-else>
      <b-col md="4" style="background-color: var(--primary)">
        <Sidebar />
      </b-col>
      <b-col md="8">
        <CreateButton />
        <router-view />
      </b-col>

      <footer v-if="windowWidth <= 767.98" class="footer-container"></footer>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import windowSizeMixin from "../mixins/windowSizeMixin.js";

import Sidebar from "../components/Sidebar.vue";
import CreateButton from "../components/CreateButton.vue";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["getUser"]),
  },
  mixins: [windowSizeMixin],
  components: {
    Sidebar,
    CreateButton,
  },
};
</script>

<style scoped>
.container-home {
  height: 100vh;
}
.footer-container {
  width: 100%;
  height: 30px;
  margin-top: 15px;
}
</style>
