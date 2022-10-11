import Vue from "vue";
import Vuex from "vuex";
import { supabaseClient } from "@/supabase/Client.js";
import incomesModule from "@/store/modules/incomesModule.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: null,
  },

  getters: {
    getUser(state) {
      return state.userData;
    },

    getFullNameUser(state) {
      return state.userData.user_metadata.full_name;
    },
  },

  mutations: {
    // alteran al estado al recibir info
    setUser(state, user) {
      state.userData = user;
    },
  },

  actions: {
    async getCurrentUser(context) {
      const user = await supabaseClient.auth.user();
      context.commit("setUser", user);
      return user;
    },

    async doLogout(context) {
      await supabaseClient.auth.signOut();
      context.commit("setUser", null);
    },
  },

  modules: {
    incomesModule,
  },
});
