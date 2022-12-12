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

    <b-row align-v="center">
      <!-- icono -->
      <b-col class="mt-3" cols="6" sm="3" lg="2">
        <select class="form-control material-icons" v-model="categoryData.icon">
          <option
            class="material-icons"
            :value="option.icon"
            :key="option.value"
            v-for="option in options"
          >
            {{ option.icon }}
          </option>
        </select>
      </b-col>

      <!-- color -->
      <b-col class="mt-3" cols="6" sm="3" lg="2">
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

      <!-- tipo -->
      <b-col class="mt-3" cols="12" sm="3" lg="2">
        <select class="form-control" v-model="categoryData.type">
          <option value="income">Ingreso</option>
          <option value="spending">Gasto</option>
        </select>
      </b-col>

      <!-- nombre de categoria -->
      <b-col class="mt-3" cols="12" sm="6" lg="4">
        <b-form-input
          placeholder="Nombre de la categoria"
          v-model="categoryData.name"
        ></b-form-input>
      </b-col>
      <b-col class="mt-3" cols="12" sm="6" lg="2">
        <b-button variant="outline-primary" size="md" @click="createCategory"
          >Crear
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CreateCategory",
  async mounted() {
    await this.$store.dispatch("searchCategories");
  },
  data() {
    return {
      categoryData: {
        icon: "more_horiz",
        name: "",
        icon_color: "#000000",
        type: "spending",
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
      if (!this.categoryData.name) {
        this.$toast.warning(
          "Completa todos los campos para crear la categoria",
          {
            position: "top-right",
            duration: 4000,
          }
        );
      } else {
        try {
          this.categoryData.name =
            this.categoryData.name.charAt(0).toUpperCase() +
            this.categoryData.name.slice(1);

          await this.$store.dispatch("createCategory", this.categoryData);
        } catch (error) {
          this.$toast.error("No fue posible crear el ingreso", {
            position: "top-right",
            duration: 4000,
          });
        }
      }
    },
  },
  computed: {
    ...mapGetters(["getCategories"]),
    options() {
      let categories = [];
      this.getCategories.forEach((category) => {
        if (!category.user_id) {
          categories.push({ value: category.id, icon: category.icon });
        }
      });
      return categories;
    },
  },
};
</script>

<style scoped></style>
