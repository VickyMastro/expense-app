<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <carousel
          :perPage="3"
          :navigationEnabled="true"
          :paginationEnabled="false"
        >
          <slide class="p-2 d-flex justify-content-center align-items-center">
            <b-card class="new-cashbox-card" @click="addCashbox">
              <b-img
                src="https://iedhiggzgrkhvvelhcks.supabase.co/storage/v1/object/public/images/add.png?t=2022-10-11T18%3A00%3A23.533Z"
                v-bind="mainProps"
                rounded="circle"
                alt="Circle image"
              ></b-img>
              <b-card-text>Agregar caja</b-card-text>
            </b-card>

            <NewCashboxModal />
          </slide>

          <slot></slot>
        </carousel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import NewCashboxModal from "./cashboxes/NewCashboxModal.vue";

export default {
  name: "MyCarousel",
  data() {
    return {
      mainProps: {
        width: 50,
        height: 50,
      },
    };
  },
  methods: {
    addCashbox() {
      this.$root.$emit("bv::show::modal", "NewCashboxModal");
    },
  },
  components: {
    Carousel,
    Slide,
    NewCashboxModal,
  },
};
</script>

<style scoped>
.new-cashbox-card {
  width: 60%;
  height: 80%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-size: 20px;
  cursor: pointer;
}
</style>
