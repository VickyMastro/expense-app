import { supabaseClient } from "@/supabase/Client.js";
export default {
  state: {
    cashboxes: [],
    banks: [],
  },
  getters: {
    getCashboxes(state) {
      return state.cashboxes;
    },

    getBanks(state) {
      return state.banks;
    },
  },
  mutations: {
    setCashboxes(state, cashboxes) {
      state.cashboxes = cashboxes;
    },

    setBanks(state, banks) {
      state.banks = banks;
    },
  },
  actions: {
    async searchCashboxes(context) {
      const { data: cashboxes, error } = await supabaseClient.rpc(
        "get_accounts",
        {
          userid: context.rootState.userData.id,
        }
      );
      if (error) throw error;
      context.commit("setCashboxes", cashboxes);
    },

    async searchBanks(context) {
      const banks = await supabaseClient.from("banks").select("*");
      context.commit("setBanks", banks.data);
    },

    async createCashbox(context, cashboxData) {
      cashboxData.user_id = context.rootState.userData.id;

      const { error } = await supabaseClient
        .from("accounts")
        .insert([cashboxData]);

      if (error) throw error;
      context.dispatch("searchCashboxes");
    },
  },
};
