<template>
  <div>
    <MyCarousel>
      <slide class="p-3" :key="index" v-for="(cashbox, index) in getCashboxes">
        <b-card class="cashboxes-cards" no-body @click="openCashbox">
          <b-card-body class="p-3">
            <b-img
              :src="cashbox.icon_url"
              v-bind="mainProps"
              rounded="circle"
              alt="Circle image"
            ></b-img>
            <b-card-text> {{ cashbox.name }} </b-card-text>
            <b-card-text
              :class="{
                positiveColor: cashbox.balance >= 0,
                negativeColor: cashbox.balance <= 0,
              }"
            >
              {{ amountFormatter(cashbox.balance) }}
            </b-card-text>
          </b-card-body>
        </b-card>
      </slide>
    </MyCarousel>
  </div>
</template>

<script>
import MyCarousel from "@/components/MyCarousel.vue";
import { amountFormatter } from "@/utils/amountFormatter";
import { mapGetters } from "vuex";
import { Slide } from "vue-carousel";

export default {
  name: "Cashboxes",
  data() {
    return {
      mainProps: {
        width: 75,
        height: 75,
        class: "m1",
      },
    };
  },
  methods: {
    amountFormatter,
    openCashbox() {
      console.log("abriedo caja");
    },
  },
  computed: {
    ...mapGetters(["getCashboxes"]),
  },
  components: {
    MyCarousel,
    Slide,
  },
};
</script>

<style scoped>
.cashboxes-cards {
  max-height: 100%;
  max-width: 80%;
  margin: 0 auto;
  box-shadow: rgba(138, 123, 165, 0.685) 0px 5px 15px;

  font-size: 18px;
  cursor: pointer;
}

.positiveColor {
  color: green;
}
.negativeColor {
  color: red;
}
</style>
