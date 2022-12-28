<template>
  <b-container>
    <b-row v-if="windowWidth <= 767.98" align-v="center">
      <b-col cols="3">
        <UserDropdown />
      </b-col>
      <b-col cols="9">
        <span style="background-color: inherit; font-size: 20px; color: white">
          {{ amountFormatter(getTotalBalance) }}
        </span>
      </b-col>
    </b-row>

    <div class="sidebar-container" v-else>
      <b-row>
        <b-col class="d-flex">
          <UserDropdown />
        </b-col>
      </b-row>

      <b-row style="margin-top: 150px;">
        <b-col>
          <Calendar />
          <p style="font-size: 35px">Saldo total</p>
          <span
            style="background-color: inherit; font-size: 30px; color: white"
          >
            {{ amountFormatter(getTotalBalance) }}
          </span>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import Calendar from "./Calendar";
import { amountFormatter } from "@/utils/amountFormatter.js";
import windowSizeMixin from "../mixins/windowSizeMixin.js";
import UserDropdown from "@/components/UserDropdown.vue";

export default {
  name: "Sidebar",
  methods: {
    amountFormatter,
  },
  computed: {
    ...mapGetters(["getFullNameUser", "getTotalBalance"]),
  },
  mixins: [windowSizeMixin],
  components: {
    Calendar,
    UserDropdown,
  },
};
</script>

<style scoped>
.sidebar-container {
  height: 100vh;
}
</style>
