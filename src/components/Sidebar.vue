<template>
  <b-container>
    <b-row class="text-start" align-v="center">
      <b-col sm="2">
        <b-icon
          class="user-icon h3 mt-2"
          icon="person"
          variant="dark"
          @click="logout"
        ></b-icon>
      </b-col>
      <b-col sm="10">
        {{ getFullNameUser }}
      </b-col>
    </b-row>

    <b-row align-v="center" class="row-container">
      <b-col>
        <Calendar />
        <p style="font-size: 35px">Saldo total</p>
        <span style="background-color: inherit; font-size: 30px; color: white">
          {{ amountFormatter(getTotalBalance) }}
        </span>
      </b-col>
    </b-row>

    <b-row align-v="center" class="row-container">
      <b-col>
        <p>doughnut chart</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import Calendar from "./Calendar";
import { amountFormatter } from "@/utils/amountFormatter.js";

export default {
  name: "Sidebar",
  methods: {
    amountFormatter,
    logout() {
      this.$store.dispatch("doLogout");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["getFullNameUser", "getTotalBalance"]),
  },
  components: {
    Calendar,
  },
};
</script>

<style scoped>
.row-container {
  height: 45vh;
}

.user-icon {
  cursor: pointer;
}
</style>
