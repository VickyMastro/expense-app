<template>
  <FormTransfer
    :transferData="transferData"
    :titleMovement="titleMovement"
    @setValue="setValue"
  >
    <b-row class="mt-5">
      <b-col class="pb-2">
        <b-button variant="outline-primary" size="md" @click="addTransfer">
          Transferir
        </b-button>
      </b-col>
    </b-row>
  </FormTransfer>
</template>

<script>
import FormTransfer from "@/components/transfers/FormTransfer";

export default {
  name: "CreateTransfer",
  mounted() {
    this.transferData.date = new Date().toISOString().split("T")[0];
  },
  data() {
    return {
      titleMovement: "Realizar transferencia",
      transferData: {
        title: "",
        from_account_id: null,
        to_account_id: null,
        cash: "",
        date: "",
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.transferData[name] = value;
    },

    async addTransfer() {
      if (
        !this.transferData.from_account_id ||
        !this.transferData.to_account_id ||
        !this.transferData.cash
      ) {
        this.$toast.warning(
          "Completa todos los campos para realizar una transferencia",
          {
            position: "top-right",
            duration: 4000,
          }
        );
      } else {
        try {
          this.transferData.title =
            this.transferData.title === ""
              ? "Transferencia"
              : this.transferData.title;

          await this.$store.dispatch("createTransfer", this.transferData);
          this.$router.push("showTransfers");

          this.test = this.transferData;
          console.log(this.test);
        } catch (error) {
          this.$toast.error("No fue posible crear el ingreso", {
            position: "top-right",
            duration: 4000,
          });
        }
      }
    },
  },
  components: {
    FormTransfer,
  },
};
</script>
