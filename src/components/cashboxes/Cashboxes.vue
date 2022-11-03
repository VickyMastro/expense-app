<template>
  <div>
    <MyCarousel>
      <slide class="p-2" :key="index" v-for="(cashbox, index) in getCashboxes">
        <b-card class="cashboxes-cards" @click="openCashbox">
          <b-img
            :src="cashbox.icon_url"
            v-bind="mainProps"
            rounded="circle"
            alt="Circle image"
          ></b-img>
          <b-card-text> {{ cashbox.name }} </b-card-text>
          <b-card-text> {{ amountFormatter(cashbox.balance) }} </b-card-text>
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
  async created() {
    await this.$store.dispatch("searchCashboxes");
  },
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
  max-height: 183px;
  max-width: 190px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-size: 18px;
  cursor: pointer;
}
</style>
