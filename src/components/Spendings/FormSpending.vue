<template>
  <b-container fluid class="mt-4">
    <b-row>
      <b-col cols="3">
        <b-icon
          class="redirect-icon h3 mt-2"
          icon="arrow-left-short"
          variant="dark"
          @click="redirectToHome"
        ></b-icon>
      </b-col>
      <b-col cols="9" align-self="center">
        <span style="padding-right: 40%">{{ titleMovement }}</span>
      </b-col>
    </b-row>

    <!-- fecha del gasto -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Fecha:</label>
      </b-col>
      <b-col sm="5">
        <b-form-input
          type="date"
          :value="spendingData.date"
          @input="(value) => $emit('setValue', 'date', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Titulo -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Titulo:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input
          :value="spendingData.title"
          @input="(value) => $emit('setValue', 'title', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Categorias -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Categoria:</label>
      </b-col>
      <b-col sm="5" class="d-flex">
        <b-dropdown
          no-caret
          dropright
          variant="link"
          toggle-class="text-decoration-none"
          class="select-category"
        >
          <template #button-content>
            <div class="d-flex">
              <span class="material-icons">{{ categorySelected.icon }}</span>

              <span style="color: #495057">{{ categorySelected.name }}</span>
            </div>
          </template>

          <b-dropdown-item-button
            :key="category.value"
            :value="category.value"
            v-for="category in categories"
            @click="setCategory(category.icon, category.value, category.name)"
          >
            <div class="d-flex mt-1">
              <span class="material-icons">{{ category.icon }}</span>
              <span> {{ category.name }}</span>
            </div>
          </b-dropdown-item-button>
        </b-dropdown>
      </b-col>
    </b-row>

    <!-- Cuenta a la que va el gasto -->
    <b-row class="mt-4" align-v="center">
      <b-col sm="3">
        <label>Cuenta:</label>
      </b-col>
      <b-col sm="3">
        <b-form-select
          :options="options"
          :value="spendingData.account_id"
          @input="(value) => $emit('setValue', 'account_id', value)"
        ></b-form-select>
      </b-col>

      <!-- Monto del ingreso -->
      <b-col sm="3">
        <label>Monto:</label>
      </b-col>
      <b-col sm="3">
        <b-form-input
          type="number"
          :value="spendingData.cash"
          @input="(value) => $emit('setValue', 'cash', value)"
        ></b-form-input>
      </b-col>
    </b-row>

    <!-- Boton -->
    <slot></slot>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FormSpending",
  props: ["spendingData", "titleMovement"],
  async mounted() {
    await this.$store.dispatch("searchCategories");
  },
  data() {
    return {
      categorySelected: {
        id: 11,
        name: "Otros",
        icon: "more_horiz",
      },
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push("/");
    },
    setCategory(icon, id, name) {
      this.categorySelected = {
        id,
        name,
        icon,
      };
      this.$emit("setValue", "category_id", id);
    },
  },
  watch: {
    "spendingData.category_id": function (categoryId) {
      if (categoryId) {
        this.categorySelected = this.categories.find((category) => {
          return category.value == categoryId;
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getCashboxes", "getCategories"]),
    options() {
      let cashboxes = [{ value: null, text: "Seleccionar cuenta" }];
      this.getCashboxes.forEach((cashbox) => {
        cashboxes.push({ value: cashbox.id, text: cashbox.name });
      });
      return cashboxes;
    },

    categories() {
      let categories = [];
      this.getCategories.forEach((category) => {
        categories.push({
          value: category.id,
          icon: category.icon,
          name: category.name,
        });
      });
      return categories;
    },
  },
};
</script>

<style scoped>
.redirect-icon {
  cursor: pointer;
}
.select-category /deep/ .dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}
.select-category {
  color: #ced4da !important;
  border: 1px solid #ced4da;
  border-radius: 2px;
}
</style>
