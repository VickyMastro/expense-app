<template>
  <b-container fluid class="mt-4">
    <!-- form -->
    <CreateCategory />

    <!-- Categorias -->
    <h5 class="mt-4" style="color: rgb(138 123 165)">Sus categorias</h5>
    <p v-if="getUserCategories.length === 0">Aún no ha creado una categoria</p>
    <b-row v-else>
      <b-col
        cols="12"
        sm="6"
        lg="4"
        :key="category.id"
        v-for="category in getUserCategories"
      >
        <b-row class="container-category mt-3 mb-2">
          <b-col cols="3">
            <span
              :style="{ background: category.icon_color }"
              class="category-icon material-icons"
            >
              {{ category.icon }}
            </span>
          </b-col>
          <b-col cols="8" class="d-flex align-items-center">
            <span>
              {{ category.name }}
            </span>

            <b-icon
              class="button-delete h4"
              icon="x-circle"
              id="buttonDelete"
              @click.stop="deleteCategory(category.id)"
            ></b-icon>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <h5 class="mt-4" style="color: rgb(138 123 165)">Categorias por defecto</h5>
    <b-row>
      <b-col
        cols="12"
        sm="6"
        lg="4"
        :key="category.id"
        v-for="category in getDefaultCategories"
      >
        <b-row class="container-category mt-3 mb-2">
          <b-col cols="3">
            <span
              :style="{ background: category.icon_color }"
              class="category-icon material-icons"
            >
              {{ category.icon }}
            </span>
          </b-col>
          <b-col cols="7" class="d-flex align-items-center">
            <span>
              {{ category.name }}
            </span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import CreateCategory from "./CreateCategory.vue";

export default {
  name: "Categories",
  methods: {
    async deleteCategory(categoryId) {
      await this.$store.dispatch("deleteCategory", categoryId);
    },
  },
  computed: {
    ...mapGetters(["getDefaultCategories", "getUserCategories"]),
  },
  components: {
    CreateCategory,
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
  right: -30px;

  cursor: pointer;
}
</style>
