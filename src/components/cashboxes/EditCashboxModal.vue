<template>
  <b-modal
    :id="cashboxId"
    title="Reajuste"
    header-bg-variant="primary"
    header-text-variant="light"
    hide-footer
  >
    <b-container fluid>
      <b-row class="my-1" align-v="center">
        <b-col sm="4">
          <label>Saldo: </label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model.number="balance"
            type="number"
            placeholder="Saldo"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1 mt-4" align-v="center" v-if="!cashboxInfo.is_wallet">
        <b-col sm="4">
          <label>Banco: </label>
        </b-col>
        <b-col sm="8">
          <b-form-select
            v-model="cashboxData.icon_url"
            :options="setOptionsBanks"
          ></b-form-select>
        </b-col>
      </b-row>

      <b-row class="my-1 mt-4" align-v="center" v-if="!cashboxInfo.is_wallet">
        <b-col sm="4">
          <label>Nombre de caja: </label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="cashboxData.name"
            placeholder="Nombre"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col class="d-flex justify-content-start align-items-center">
          <b-button
            variant="outline-primary"
            size="sm"
            :class="{ disabledWallet: cashboxInfo.is_wallet }"
            :disabled="cashboxInfo.is_wallet"
            @click="disabledCashbox()"
          >
            Deshabilitar
          </b-button>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button class="readjustButton" @click="readjustCashbox">
            Reajustar caja
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["cashboxId", "cashboxInfo"],
  name: "EditCashboxModal",
  mounted() {
    this.$root.$on("bv::modal::show", () => {
      try {
        this.balance = this.lastBalance = this.cashboxInfo.balance;

        for (let propertyName in this.cashboxData) {
          this.cashboxData[propertyName] = this.cashboxInfo[propertyName];
        }
      } catch (error) {
        this.$router.push("/");
        this.$toast.error("No fue posible abrir la caja", {
          position: "top-right",
          duration: 4000,
        });
      }
    });
  },
  data() {
    return {
      balance: 0,
      lastBalance: 0,
      cashboxData: {
        icon_url: null,
        name: "",
      },
      newMovement: {
        date: new Date().toISOString().split("T")[0],
        title: "Reajuste",
        account_id: null,
        cash: 0,
      },
    };
  },
  methods: {
    async readjustCashbox() {
      if (
        this.balance === ""||
        !this.cashboxData.icon_url ||
        !this.cashboxData.name
      ) {
        this.$toast.warning(
          "Completa todos los campos para reajustar la caja",
          {
            position: "top-right",
            duration: 4000,
          }
        );
      } else {
        try {
          let amountToSet = this.lastBalance - this.balance;
          amountToSet = Math.abs(amountToSet);

          await this.$store.dispatch("editCashbox", {
            cashboxData: this.cashboxData,
            cashboxId: this.cashboxInfo.id,
          });

          if (this.lastBalance !== this.balance) {
            if (this.lastBalance < this.balance) {
              this.createIncomeForCashbox(amountToSet);
            } else {
              this.createSpendingForCashbox(amountToSet);
            }
          }
          await this.$store.dispatch("getIncomes");
          await this.$store.dispatch("getSpendings");
          this.$bvModal.hide(this.cashboxId);
        } catch (error) {
          this.$toast.error("No fue posible reajustar la caja", {
            position: "top-right",
            duration: 4000,
          });
        }
      }
    },

    createIncomeForCashbox(amountToSet) {
      this.newMovement.cash = amountToSet;
      this.newMovement.account_id = this.cashboxInfo.id;

      this.$store.dispatch("createIncome", this.newMovement);
    },

    createSpendingForCashbox(amountToSet) {
      this.newMovement.cash = amountToSet;
      this.newMovement.account_id = this.cashboxInfo.id;

      this.$store.dispatch("createSpending", this.newMovement);
    },

    async disabledCashbox() {
      try {
        await this.$store.dispatch("disabledCashbox", this.cashboxInfo.id);
        this.$bvModal.hide(this.cashboxId);
        this.$toast.success("La caja fue deshabilitada", {
          position: "top-right",
          duration: 4000,
        });
      } catch (error) {
        this.$toast.error("No fue posible deshabilitar la caja", {
          position: "top-right",
          duration: 4000,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getBanks", "getCashboxes"]),
    setOptionsBanks() {
      let banks = [{ value: null, text: "Banco" }];
      this.getBanks.forEach((bank) => {
        banks.push({ value: bank.icon_url, text: bank.name });
      });
      return banks;
    },
  },
};
</script>

<style lang="scss" scoped>
.disabledWallet {
  cursor: not-allowed;
}
.readjustButton {
  padding: 10px;
  color: white;
  background-color: var(--primary);

  font-size: 20px;

  border: none;
  border-radius: 5px;
}
</style>
