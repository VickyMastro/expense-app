import { supabaseClient } from "@/supabase/Client.js";
export default {
  state: {
    spendings: [],
  },
  getters: {
    spendingsOrderByDate(state) {
      let orderByDate = {};
      state.spendings.forEach((spending) => {
        // eslint-disable-next-line no-prototype-builtins
        if (orderByDate.hasOwnProperty(spending.date)) {
          orderByDate[spending.date].push(spending);
        } else {
          orderByDate[spending.date] = [spending];
        }
      });
      return orderByDate;
    },
  },
  mutations: {
    setSpendings(state, spending) {
      state.spendings = spending;
    },
  },
  actions: {
    async getSpendings(context) {
      const spendings = await supabaseClient
        .from("movements")
        .select("*")
        .eq("type", "outflow")
        .eq("user_id", context.rootState.userData.id)
        .order("date", { ascending: false });
      context.commit("setSpendings", spendings.data);
    },

    async getSpending(context, spendingId) {
      const spending = await supabaseClient
        .from("movements")
        .select("*")
        .eq("id", spendingId);
      return spending.data[0];
    },

    async createSpending(context, spendingData) {
      spendingData.user_id = context.rootState.userData.id;
      spendingData.type = "outflow";

      const { error } = await supabaseClient
        .from("movements")
        .insert([spendingData]);

      if (error) throw error;
    },

    async editSpending(context, { spendingData, id }) {
      const { error } = await supabaseClient
        .from("movements")
        .update([spendingData])
        .match({ id: id });

      if (error) throw error;
    },

    async deleteSpending(context, spendingId) {
      const { error } = await supabaseClient
        .from("movements")
        .delete()
        .match({ id: spendingId });

      if (error) throw error;

      context.dispatch("getSpendings");
    },
  },
};
