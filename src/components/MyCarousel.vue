<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <carousel
          :perPage="quantityPerPage"
          :navigationEnabled="true"
          :paginationEnabled="false"
        >
          <slot></slot>

          <slide
            class="p-2 d-flex justify-content-center align-items-center"
            v-if="showAddCashbox === true"
          >
            <b-card class="new-cashbox-card" @click="addCashbox">
              <b-img
                src="https://iedhiggzgrkhvvelhcks.supabase.co/storage/v1/object/public/images/add.png?t=2022-10-11T18%3A00%3A23.533Z"
                v-bind="mainProps"
                rounded="circle"
                alt="Circle image"
              ></b-img>
              <b-card-text style="overflow-wrap: normal"
                >Agregar caja
              </b-card-text>
            </b-card>

            <NewCashboxModal />
          </slide>
        </carousel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import NewCashboxModal from "./cashboxes/NewCashboxModal.vue";
import windowSizeMixin from "@/mixins/windowSizeMixin";

export default {
  name: "MyCarousel",
  props: ["showAddCashbox"],
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
  computed: {
    quantityPerPage() {
      return this.windowWidth <= 767.98 ? (this.windowWidth <= 576 ? 1 : 2) : 3;
    },
  },
  mixins: [windowSizeMixin],
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
  height: 140px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-size: 17px;
  cursor: pointer;
}

@media (max-width: 576px) {
  .new-cashbox-card {
    font-size: 20px;
  }
}
</style>
