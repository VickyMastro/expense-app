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
        <p>Calendario para elegir mes</p>
        <p style="font-size: 35px">Saldo total</p>
        <b-button size="lg" style="background-color: inherit; border: none">{{
          userData.totalAmount
        }}</b-button>
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

export default {
  name: "Sidebar",
  data() {
    return {
      userData: {
        totalAmount: "$100.000,00",
      },
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("doLogout");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["getFullNameUser"]),
  },
};
</script>

<style scoped>
.row-container {
  height: 45vh;
}

.user-icon{
  cursor: pointer;
}
</style>
