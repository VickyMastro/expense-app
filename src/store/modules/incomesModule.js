import { supabaseClient } from "@/supabase/Client.js";
export default {
  state: {
    incomes: [],
  },
  getters: {
    incomesOrderByDate(state) {
      let orderByDate = {};
      state.incomes.forEach((income) => {
        // eslint-disable-next-line no-prototype-builtins
        if (orderByDate.hasOwnProperty(income.date)) {
          orderByDate[income.date].push(income);
        } else {
          orderByDate[income.date] = [income];
        }
      });
      return orderByDate;
    },
  },
  mutations: {
    setIncome(state, income) {
      state.incomes = income;
    },
  },
  actions: {
    async getIncomes(context) {
      const incomes = await supabaseClient
        .from("movements")
        .select(`*, accounts!inner(name, disabled)`)
        .eq("type", "income")
        .eq("user_id", context.rootState.userData.id)
        .eq("accounts.disabled", false)
        .gte("date", context.rootState.filterDate.firstDay)
        .lte("date", context.rootState.filterDate.lastDay)
        .is("transfer_id", null)
        .order("date", { ascending: false });
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
      incomeData.user_id = context.rootState.userData.id;
      incomeData.type = "income";

      const { error } = await supabaseClient
        .from("movements")
        .insert([incomeData]);

      if (error) throw error;
      context.dispatch("searchCashboxes", null, { root: true });
    },

    async editIncome(context, { incomeData, id }) {
      const { error } = await supabaseClient
        .from("movements")
        .update([incomeData])
        .match({ id: id });

      if (error) throw error;
      context.dispatch("searchCashboxes", null, { root: true });
    },

    async deleteIncome(context, incomeId) {
      const { error } = await supabaseClient
        .from("movements")
        .delete()
        .match({ id: incomeId });

      if (error) throw error;

      context.dispatch("getIncomes");
      context.dispatch("searchCashboxes", null, { root: true });
    },
  },
};
