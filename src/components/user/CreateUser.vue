<template>
  <div class="d-flex justify-content-around pt-4">
    <FormUser :userData="userData" :isCreateUser="true" @setValue="setValue">
      <div class="d-flex justify-content-end mt-3">
        <b-button variant="outline-primary" @click="createUser">
          Crear
        </b-button>
      </div>
    </FormUser>
  </div>
</template>

<script>
import FormUser from "./FormUser.vue";
import { supabaseClient } from "@/supabase/Client.js";

export default {
  name: "CreateUser",
  data() {
    return {
      userData: {
        titleForm: "Crear Usuario ",
        name: "",
        email: "",
        password: "",
        msj: "¿Tenes usuario? Ingresa",
      },
    };
  },
  methods: {
    setValue(name, value) {
      this.userData[name] = value;
    },

    async createUser() {
      console.log("creando");
      try {
        const { error } = await supabaseClient.auth.signUp({
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
        });


        this.$toast.success("Revisa tu mail y confirmalo", {
          position: "top-right",
          duration: 4000,
        });

        if (error) throw error;
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
