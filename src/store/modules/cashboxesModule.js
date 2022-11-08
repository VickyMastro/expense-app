import { supabaseClient } from "@/supabase/Client.js";
export default {
  state: {
    cashboxes: [],
    banks: [],
  },
  getters: {
    getCashboxes(state) {
      return state.cashboxes.filter((cashbox) => cashbox.disabled === false);
    },

    getCashboxesDisabled(state) {
      return state.cashboxes.filter((cashbox) => cashbox.disabled === true);
    },

    getBanks(state) {
      return state.banks;
    },

    getTotalBalance(state) {
      // count es el acumulador que inicia en 0
      return state.cashboxes.reduce((count, cashbox) => {
        return cashbox.disabled === false ? count + cashbox.balance : count;
      }, 0);
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

    async editCashbox(context, { cashboxData, cashboxId }) {
      const { error } = await supabaseClient
        .from("accounts")
        .update([cashboxData])
        .match({ id: cashboxId });

      if (error) throw error;
      context.dispatch("searchCashboxes");
    },

    async disabledCashbox (context, cashboxId){
      const { error } = await supabaseClient
        .from("accounts")
        .update([{disabled: true}])
        .match({ id: cashboxId });

      if (error) throw error;
      context.dispatch("searchCashboxes");
      context.dispatch("getIncomes", null, { root: true });
      context.dispatch("getSpendings", null, { root: true });
    },

    async enableCashbox (context, cashboxId){
      const { error } = await supabaseClient
        .from("accounts")
        .update([{disabled: false}])
        .match({ id: cashboxId });

      if (error) throw error;
      context.dispatch("searchCashboxes");
    }
  },
};
