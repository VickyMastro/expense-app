<template>
  <div class="d-flex justify-content-around pt-4">
    <FormUser :userData="userData" :isCreateUser="false" @setValue="setValue">
      <div class="d-flex justify-content-end mt-3">
        <b-button variant="outline-primary" @click="login"> Ingresar </b-button>
      </div>
    </FormUser>
  </div>
</template>

<script>
import FormUser from "./FormUser.vue";
import { supabaseClient } from "@/supabase/Client.js";

export default {
  name: "LoginUser",
  data() {
    return {
      userData: {
        titleForm: "Ingresar a tu cuenta ",
        email: "",
        password: "",
        msj: "¿No tenes usuario? Registrate",
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.userData[name] = value;
    },

    async login() {
      try {
        const { user, error } = await supabaseClient.auth.signIn({
          email: this.userData.email,
          password: this.userData.password,
        });

        if (error) throw error;

        this.$router.push({ name: "Home" });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    FormUser,
  },
};
</script>
