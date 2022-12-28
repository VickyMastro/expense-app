<template>
  <div class="user-form-container d-flex flex-column">
    <div
      class="text-center fs-1"
      style="font-size: 28px; color: rgb(138 123 165)"
    >
      <p>{{ userData.titleForm }}</p>
    </div>
    <div class="inputs-container mb-3" v-if="isCreateUser">
      <label>Nombre</label>
      <b-form-input
        placeholder="ej.:Vi"
        @input="(value) => $emit('setValue', 'name', value)"
      ></b-form-input>
    </div>
    <div class="inputs-container mb-3">
      <label>Email</label>
      <b-form-input
        type="email"
        placeholder="name@example.com"
        @input="(value) => $emit('setValue', 'email', value)"
      ></b-form-input>
    </div>
    <div class="inputs-container">
      <label>Contraseña</label>
      <b-form-input
        type="password"
        placeholder="Password"
        @input="(value) => $emit('setValue', 'password', value)"
      ></b-form-input>
    </div>
    <router-link class="link-user" :to="{ name: url }">{{
      userData.msj
    }}</router-link>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  props: ["userData", "isCreateUser"],
  computed: {
    url() {
      return this.isCreateUser ? "Login" : "CreateUser";
    },
  },
};
</script>

<style scoped>
.user-form-container {
  max-width: 500px;
  height: 300px;
}
.inputs-container {
  width: 350px;
}
.link-user {
  padding-top: 15px;
  color: var(--primary);
}
</style>
