import Vue from "vue";
import Vuex from "vuex";
import { supabaseClient } from "@/supabase/Client.js";
import incomesModule from "@/store/modules/incomesModule.js";
import spendingsModule from "@/store/modules/spendingsModule.js";
import cashboxesModule from "@/store/modules/cashboxesModule.js";
import transfersModule from "@/store/modules/transfersModule.js";
import categoriesModule from "@/store/modules/categoriesModule.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: null,
    filterDate: {},
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

    setFilterDay(state, daysOfMonth) {
      state.filterDate = daysOfMonth;
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

    filterDate(context, daysOfMonth) {
      context.commit("setFilterDay", daysOfMonth);
      context.dispatch("getIncomes");
      context.dispatch("getSpendings");
      context.dispatch("searchCashboxes");
    },
  },

  modules: {
    incomesModule,
    spendingsModule,
    cashboxesModule,
    transfersModule,
    categoriesModule,
  },
});
