import Vue from "vue";
import Vuex from "vuex";
import { supabaseClient } from "@/supabase/Client.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: null,
    incomes: [],
  },

  getters: {
    getUser(state) {
      return state.userData;
    },

    getFullNameUser(state) {
      return state.userData.user_metadata.full_name;
    },

    incomes(state) {
      return state.incomes;
    },
  },

  mutations: {
    // alteran al estado al recibir info
    setUser(state, user) {
      state.userData = user;
    },

    setIncome(state, income) {
      state.incomes = income;
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

    async getIncomes(context) {
      const incomes = await supabaseClient
        .from("movements")
        .select("*")
        .eq("type", "income");
      context.commit("setIncome", incomes.data);
    },

    async getIncome(context, incomeId) {
      const income = await supabaseClient
        .from("movements")
        .select("*")
        .eq("id", incomeId);
      return income.data[0];
    },

    async createIncome(context, incomeData) {
      incomeData.user_id = context.state.userData.id;
      incomeData.type = "income";

      const { error } = await supabaseClient
        .from("movements")
        .insert([incomeData]);

      if (error) throw error;
    },

    async editIncome(context,{ incomeData, id}){
      const { error } = await supabaseClient
        .from("movements")
        .update([incomeData])
        .match({id: id});

      if (error) throw error;
    },
  },

  modules: {},
});
