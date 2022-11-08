<template>
  <div
    v-if="getCashboxesDisabled.length === 0"
    style="color: var(--primary); font-size: 23px; margin-top: 40px"
  >
    <p>No hay cajas deshabilitadas</p>
  </div>

  <div v-else>
    <h3 class="pt-3">Sus cajas deshabilitadas</h3>
    <b-row class="pt-2">
      <b-col
        cols="4"
        :key="index"
        v-for="(cashbox, index) in getCashboxesDisabled"
      >
        <b-card
          class="cashboxes-cards"
          :class="{ cashboxSelect: cashbox.id === selectCashboxId }"
          no-body
          @click="setSelectCashbox(cashbox.id)"
        >
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
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-4">
        <b-button
          :disabled="!selectCashboxId"
          variant="outline-primary"
          size="md"
          @click="enableCashbox"
        >
          Habilitar caja
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-4" :key="key" v-for="(movement, key) in movements">
      <div class="container-movements">
        <b-row>
          <b-col cols="2">
            <b-icon
              style="margin-top: 15px"
              class="h3"
              icon="exclamation-circle-fill"
              variant="primary"
            ></b-icon>
          </b-col>
          <b-col cols="10">
            <b-row>
              <b-col cols="12">
                {{ movement.title }}
              </b-col>
              <b-col cols="4" class="d-flex justify-content-start">
                {{ movement.accounts.name }}
              </b-col>
              <b-col
                cols="8"
                :class="{
                  positiveColor: movement.type === 'income',
                  negativeColor: movement.type === 'outflow',
                }"
              >
                {{ amountFormatter(movement.cash) | signFilter(movement.type) }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { amountFormatter } from "@/utils/amountFormatter";
import { supabaseClient } from "@/supabase/Client.js";

export default {
  name: "DisabledCashboxes",
  data() {
    return {
      selectCashboxId: null,
      movements: [],
      mainProps: {
        width: 75,
        height: 75,
        class: "m1",
      },
    };
  },
  methods: {
    amountFormatter,
    async setSelectCashbox(cashboxId) {
      try {
        this.selectCashboxId = cashboxId;
        const { error, data: cashboxMovements } = await supabaseClient
          .from("movements")
          .select(`*, accounts!inner(id, name)`)
          .eq("accounts.id", cashboxId)
          .order("date", { ascending: false });

        this.movements = cashboxMovements;

        if (error) throw error;
      } catch (error) {
        this.$toast.error("No fue posible seleccionar la caja", {
          position: "top-right",
          duration: 4000,
        });
      }
    },
    async enableCashbox() {
      try {
        await this.$store.dispatch("enableCashbox", this.selectCashboxId);
        this.movements = [];
        this.selectCashboxId = null;

        this.$toast.success("La caja fue habilitada", {
          position: "top-right",
          duration: 4000,
        });
      } catch (error) {
        this.$toast.error("No fue posible habilitar la caja", {
          position: "top-right",
          duration: 4000,
        });
      }
    },
  },
  filters: {
    signFilter(value, type) {
      return type === "outflow" ? "-" + value : value;
    },
  },
  computed: {
    ...mapGetters(["getCashboxesDisabled"]),
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

.container-movements {
  width: 70%;
  height: 60px;

  margin: 0 auto;

  background-color: rgb(138 123 165 / 20%);
  border-radius: 20px;
  box-shadow: rgb(138 123 165 / 69%) 0px 5px 15px;
}

/* dynamic classes */
.cashboxSelect {
  border: 2px solid var(--primary);
}
.positiveColor {
  color: green;
}
.negativeColor {
  color: red;
}

@media (max-width: 767.98px) {
  .container-movements {
    width: 90%;
  }
}
</style>
