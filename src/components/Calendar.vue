<template>
  <div>
    <b-button @click="show = !show" variant="primary" class="month">{{
      date.month
    }}</b-button>
    <transition name="fade">
      <month-picker
        @change="showDate"
        v-show="show"
        lang="es"
        :default-month="new Date().getMonth() + 1"
        class="calendario"
      ></month-picker>
    </transition>
  </div>
</template>

<script>
import { MonthPicker } from "vue-month-picker";

export default {
  name: "Calendar",
  data() {
    return {
      show: false,
      date: {
        from: null,
        to: null,
        month: null,
        year: null,
      },
    };
  },
  components: {
    MonthPicker,
  },
  methods: {
    showDate(date) {
      let lastDay = new Date(date.year, date.monthIndex, 0);
      lastDay = lastDay.toISOString().split("T")[0];

      let firstDay = new Date(date.year, date.monthIndex - 1, 1);
      firstDay = firstDay.toISOString().split("T")[0];

      this.$store.dispatch("filterDate", { firstDay, lastDay });

      this.date = date;
    },
  },
};
</script>

<style scoped>
.calendario {
  position: absolute;
  z-index: 10;
  width: 250px;
}
.month {
  border: 1px solid grey;
  font-size: 30px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
