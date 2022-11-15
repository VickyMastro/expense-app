<template>
  <div>
    <MyCarousel :showAddCashbox="showAddCashbox">
      <slide class="p-3" :key="index" v-for="(cashbox, index) in getCashboxes">
        <b-card class="cashboxes-cards" no-body @click="openCashbox(cashbox.name, cashbox.id)">
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

        <EditCashboxModal :cashboxId="cashbox.name + cashbox.id" :cashboxInfo="cashbox" />
      </slide>
    </MyCarousel>
  </div>
</template>

<script>
import MyCarousel from "@/components/MyCarousel.vue";
import EditCashboxModal from "./EditCashboxModal.vue";
import { amountFormatter } from "@/utils/amountFormatter";
import { mapGetters } from "vuex";
import { Slide } from "vue-carousel";

export default {
  name: "Cashboxes",
  props: ["showAddCashbox"],
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
    openCashbox(cashboxName, cashboxId) {
      if (this.showAddCashbox){
        this.$root.$emit("bv::show::modal", cashboxName + cashboxId);
      } else {
        this.$emit('getCashboxId', cashboxId)
      }
    },
  },
  computed: {
    ...mapGetters(["getCashboxes"]),
  },
  components: {
    MyCarousel,
    Slide,
    EditCashboxModal,
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
