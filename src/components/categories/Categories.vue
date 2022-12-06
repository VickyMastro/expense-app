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
        <span style="padding-right: 40%">Categorias</span>
      </b-col>
    </b-row>

    <b-row class="mt-4" align-v="center">
      <b-col sm="2">
        <select class="form-control material-icons" v-model="categoryData.icon">
          <option
            class="material-icons"
            :value="option.text"
            :key="option.value"
            v-for="option in options"
          >
            {{ option.text }}
          </option>
        </select>
      </b-col>
      <b-col sm="3">
        <input
        class="form-control"
          type="color"
          v-model="categoryData.icon_color"
          list="listacoloresperfil"
        />

        <datalist id="listacoloresperfil">
          <option :value="color" :key="color" v-for="color in colors"></option>
        </datalist>
      </b-col>
      <b-col sm="5">
        <b-form-input v-model="categoryData.name"></b-form-input>
      </b-col>
      <b-col sm="2">
        <b-button variant="outline-primary" size="md" @click="createCategory"
          >Crear
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col
        cols="12"
        sm="6"
        lg="4"
        :key="category.id"
        v-for="category in getCategories"
      >
        <b-row class="container-category mt-3 mb-2">
          <b-col cols="2">
            <span
              :style="{ background: category.icon_color }"
              class="category-icon material-icons"
            >
              {{ category.icon }}
            </span>
          </b-col>
          <b-col cols="6" class="d-flex align-items-center">
            <b-col cols="3" class="d-flex">
              {{ category.name }}
            </b-col>

            <b-icon
              v-if="category.user_id"
              class="button-delete h4"
              icon="x-circle"
              id="buttonDelete"
              @click.stop="deleteCategory(category.id)"
            ></b-icon>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Categories",
  async mounted() {
    await this.$store.dispatch("searchCategories");
  },
  data() {
    return {
      categoryData: {
        icon: "more_horiz",
        name: "",
        icon_color: "#000000",
      },
      colors: [
        "#ff4444",
        "#ff8a00",
        "#8ad5f0",
        "#004e09",
        "#cc0000",
        "#2cb1e1",
        "#24847a",
        "#2a23ff",
        "#9933cc",
        "#ffd980",
        "#bcbcbc",
        "#000000",
        "#ef36f2",
      ],
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push("/");
    },

    async createCategory() {
      await this.$store.dispatch("createCategory", this.categoryData);
    },

    async deleteCategory(categoryId) {
      await this.$store.dispatch("deleteCategory", categoryId);
    },
  },
  computed: {
    ...mapGetters(["getCategories"]),
    options() {
      let categories = [];
      this.getCategories.forEach((category) => {
        categories.push({ value: category.id, text: category.icon });
      });
      return categories;
    },
  },
};
</script>

<style scoped>
.container-category {
  height: 60px;

  margin: 0 auto;

  background-color: rgb(138 123 165 / 20%);
  border-radius: 20px;
  box-shadow: rgb(138 123 165 / 69%) 0px 5px 15px;
}
.category-icon {
  color: white;
  margin-top: 15px;
  margin-left: 5px;
  padding: 5px;
  border-radius: 15px;
}
.button-delete {
  background-color: white;
  border-radius: 25px;

  position: absolute;
  top: -10px;
  right: -90px;

  cursor: pointer;
}
</style>
