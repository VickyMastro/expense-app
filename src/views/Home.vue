<template>
  <b-container fluid>
    <b-row class="container-home" v-if="!getUser">
      <b-col style="padding: 0px">
        <router-view />
      </b-col>
    </b-row>

    <div class="container-home" v-else>
      <b-row v-if="windowWidth <= 767.98">
        <b-col md="4" style="background-color: var(--primary)">
          <Sidebar />
        </b-col>
        <b-col md="8" class="mt-3">
          <Calendar v-if="showCalendar" />
          <router-view />
        </b-col>
        <b-col class="footer-container">
          <div>
            <CreateButton />
          </div>
        </b-col>
      </b-row>

      <b-row v-else>
        <b-col cols="12" md="4" lg="3" style="background-color: var(--primary)">
          <Sidebar />
        </b-col>
        <b-col cols="12" md="8" lg="9">
          <CreateButton />
          <router-view />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import windowSizeMixin from "../mixins/windowSizeMixin.js";

import Sidebar from "../components/Sidebar.vue";
import CreateButton from "../components/CreateButton.vue";
import Calendar from "../components/Calendar";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["getUser"]),
    showCalendar() {
      let foundCreate = this.$route.path.search("create");
      let foundEdit = this.$route.path.search("edit");

      return foundCreate !== -1 ||
        foundEdit !== -1 ||
        this.$route.path === "/disabledCashboxes" ||
        this.$route.path === "/categories"
        ? false
        : true;
    },
  },
  mixins: [windowSizeMixin],
  components: {
    Sidebar,
    CreateButton,
    Calendar,
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
