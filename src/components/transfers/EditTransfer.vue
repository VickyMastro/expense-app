<template>
  <FormTransfer
    :transferData="transferData"
    :titleMovement="titleMovement"
    @setValue="setValue"
  >
    <b-row class="mt-5">
      <b-col class="pb-2">
        <b-button variant="outline-primary" size="md" @click="editTransfer">
          Editar
        </b-button>
      </b-col>
    </b-row>
  </FormTransfer>
</template>

<script>
import FormTransfer from "@/components/transfers/FormTransfer";

export default {
  name: "EditTransfer",
  async mounted() {
    try {
      const response = await this.$store.dispatch(
        "getTransfer",
        this.$route.params.id
      );
      this.setData(response);
    } catch (error) {
      console.log(error);
      this.$router.push("transfers/showTransfers");
      this.$toast.error("No fue posible abrir la transferencia", {
        position: "top-right",
        duration: 4000,
      });
    }
  },
  data() {
    return {
      titleMovement: "Editar transferencia",
      transferData: {
        title: "",
        from_account_id: null,
        to_account_id: null,
        cash: "",
        date: "",
        outflow_id: null,
        income_id: null,
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.transferData[name] = value;
    },

    setData(response) {
      for (let propertyName in this.transferData) {
        this.transferData[propertyName] = response[propertyName];
      }
      this.transferData.from_account_id = response.account_id;
      this.transferData.to_account_id = response.movements[0].account_id;
      this.transferData.outflow_id = response.id;
      this.transferData.income_id = response.movements[0].id;
    },

    async editTransfer() {
      if (
        !this.transferData.from_account_id ||
        !this.transferData.to_account_id ||
        !this.transferData.cash
      ) {
        this.$toast.warning(
          "Completa todos los campos para editar una transferencia",
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

          await this.$store.dispatch("editTransfer", this.transferData);
          this.$router.push({name: "ShowTransfers"});

          this.test = this.transferData;
        } catch (error) {
          this.$toast.error("No fue posible editar la transferencia", {
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
