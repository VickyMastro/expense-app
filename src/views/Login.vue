<template>
  <div>
    <button @click="login">Ingresar</button>
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
