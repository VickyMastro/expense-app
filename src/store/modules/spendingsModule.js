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
        .select(`*, accounts!inner(name, disabled), categories!inner(icon_color, icon)`)
        .eq("type", "outflow")
        .eq("user_id", context.rootState.userData.id)
        .eq("accounts.disabled", false)
        .gte("date", context.rootState.filterDate.firstDay)
        .lte("date", context.rootState.filterDate.lastDay)
        .is("transfer_id", null)
        .order("date", { ascending: false })
        .order("id", { ascending: false });
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
      context.dispatch("searchCashboxes", null, { root: true });
    },

    async editSpending(context, { spendingData, id }) {
      const { error } = await supabaseClient
        .from("movements")
        .update([spendingData])
        .match({ id: id });

      if (error) throw error;
      context.dispatch("searchCashboxes", null, { root: true });
    },

    async deleteSpending(context, spendingId) {
      const { error } = await supabaseClient
        .from("movements")
        .delete()
        .match({ id: spendingId });

      if (error) throw error;

      context.dispatch("getSpendings");
      context.dispatch("searchCashboxes", null, { root: true });
    },
  },
};
