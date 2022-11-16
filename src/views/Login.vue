<template>
  <div class="login">
    <h3 class="pb-3">Inicia sesión con google</h3>
    <b-button variant="outline-primary" size="md" @click="login">
      Ingresar
    </b-button>
  </div>
</template>

<script>
import { supabaseClient } from "@/supabase/Client.js";

export default {
  name: "Login",
  async mounted() {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        this.$router.push("/");
      }
    });
  },
  methods: {
    async login() {
      await supabaseClient.auth.signIn({
        provider: "google",
      });
    },
  },
};
</script>

<style scoped>
.login {
  height: 100%;
  padding: 25%;
  /* background-color: var(--primary); */
}
</style>
