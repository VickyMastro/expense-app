<template>
  <b-dropdown no-caret variant="primary">
    <template #button-content>
      <b-icon class="user-icon mt-2" icon="person" variant="light"></b-icon>
    </template>
    <b-dropdown-item link-class="bg-white" variant="dark" :to="{ name: 'Home' }"
      >Inicio</b-dropdown-item
    >
    <b-dropdown-item
      link-class="bg-white"
      variant="dark"
      :to="{ name: 'ShowTransfers' }"
      >Transferencias</b-dropdown-item
    >
    <b-dropdown-item
      link-class="bg-white"
      variant="dark"
      :to="{ name: 'Categories' }"
      >Categorias</b-dropdown-item
    >
    <b-dropdown-item
      link-class="bg-white"
      variant="dark"
      :to="{ name: 'DisabledCashboxes' }"
      >Cajas deshabilitadas</b-dropdown-item
    >
    <b-dropdown-item link-class="bg-white" variant="danger" @click="logout"
      >Cerrar sesión</b-dropdown-item
    >
  </b-dropdown>
</template>

<script>
export default {
  name: "UserDropdown",
  methods: {
    logout() {
      this.$store.dispatch("doLogout");
      this.$router.push({name: "Login"});
    },
  },
};
</script>

<style scoped>
.user-icon {
  cursor: pointer;
  font-size: 30px !important;
}
</style>
