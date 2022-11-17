<template>
  <div>
    <Cashboxes :showAddCashbox="false" @getCashboxId="getCashboxId" />

    <b-row>
      <b-col class="mt-2">
        <span class="title">Transferencias</span>
      </b-col>
    </b-row>

    <b-row v-if="transfers.length === 0">
      <b-col class="mt-2">
        <span class="title-2">Aún no se realizaron transferencias</span>
      </b-col>
    </b-row>

    <b-row
      class="mt-4"
      :key="index"
      v-for="(transfer, index) in transfers"
      v-else
    >
      <div class="container-movements" @click="editTransfer(transfer.id)">
        <b-row>
          <b-col cols="2">
            <b-icon
              class="transfer-icon h3"
              icon="arrow-left-right"
              variant="primary"
            ></b-icon>
          </b-col>
          <b-col cols="10">
            <b-row align-v="center">
              <b-col cols="6">
                {{ transfer.title }}
              </b-col>
              <b-col cols="6">
                {{ amountFormatter(transfer.cash) }}
              </b-col>

              <b-col cols="4" class="d-flex justify-content-end">
                <b-img
                  :src="transfer.accounts.icon_url"
                  v-bind="iconProps"
                  class="mr-1"
                  rounded="circle"
                  alt="Icono de la cuenta de la que transfirio dinero"
                ></b-img>
                {{ transfer.accounts.name }}
              </b-col>
              <b-col cols="2">
                <b-icon
                  class="h3 mt-2"
                  icon="arrow-right"
                  variant="dark"
                ></b-icon>
              </b-col>
              <b-col cols="5" class="d-flex">
                <b-img
                  :src="transfer.movements[0].accounts.icon_url"
                  v-bind="iconProps"
                  class="mr-1"
                  rounded="circle"
                  alt="Icono de la cuenta a la que transfirio dinero"
                ></b-img>
                {{ transfer.movements[0].accounts.name }}
              </b-col>
              <b-icon
                class="button-delete h4"
                icon="x-circle"
                id="buttonDelete"
                @click.stop="deleteTransfer(transfer.id, index)"
              ></b-icon>
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
import Cashboxes from "@/components/cashboxes/Cashboxes.vue";

export default {
  name: "ShowTransfers",
  async created() {
    this.transfers = await this.$store.dispatch("searchTransfers");
    await this.$store.dispatch("searchCashboxes");
  },
  data() {
    return {
      transfers: [],
      selectCashboxId: null,
      mainProps: {
        width: 75,
        height: 75,
        class: "m1",
      },
      iconProps: {
        width: 25,
        height: 25,
        class: "m1",
      },
    };
  },
  methods: {
    amountFormatter,
    getCashboxId(id) {
      if (this.selectCashboxId !== id) {
        this.transfers = this.getTransfers.filter((transfer) => {
          return transfer.account_id === id ||
            transfer.movements[0].account_id === id
            ? transfer
            : null;
        });
      } else {
        this.transfers = this.getTransfers;
      }
      this.selectCashboxId = id;
    },

    editTransfer(transferId) {
      this.$router.push({ name: "EditTransfer", params: { id: transferId } });
    },

    async deleteTransfer(transferId, index) {
      try {
        await this.$store.dispatch("deleteTransfer", transferId);
        await this.$store.dispatch("searchCashboxes");
        this.transfers = this.transfers.splice(index, 1);
      } catch (error) {
        this.$toast.error("No fue posible eliminar la transferencia", {
          position: "top-right",
          duration: 4000,
        });
      }
    },
  },
  watch: {
    "$store.state.filterDate": async function () {
      await this.$store.dispatch("searchTransfers");
      this.transfers = this.getTransfers;
    },
  },
  computed: {
    ...mapGetters(["getTransfers"]),
  },
  components: {
    Cashboxes,
  },
};
</script>

<style scoped>
.title {
  font-size: 28px;
  color: rgb(138 123 165);
}
.title-2 {
  font-size: 20px;
  color: rgb(138 123 165);
}
.transfer-icon {
  margin-top: 15px;
  padding: 5px;
  border: 1px solid rgb(138 123 165);
  border-radius: 30px;
}
.container-movements {
  width: 70%;
  height: 60px;

  margin: 0 auto;

  background-color: rgb(138 123 165 / 20%);
  border-radius: 20px;
  box-shadow: rgb(138 123 165 / 69%) 0px 5px 15px;
}
.button-delete {
  background-color: white;
  border-radius: 25px;

  position: absolute;
  top: -10px;
  right: 8px;

  cursor: pointer;
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
