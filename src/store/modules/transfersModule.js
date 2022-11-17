import { supabaseClient } from "@/supabase/Client.js";
export default {
  state: {
    transfers: [],
  },
  getters: {
    getTransfers(state) {
      return state.transfers;
    },
  },
  mutations: {
    setTransfers(state, transfer) {
      state.transfers = transfer;
    },
  },
  actions: {
    async searchTransfers(context) {
      const transfers = await supabaseClient
        .from("movements")
        .select(
          `*, accounts(name, icon_url), movements(account_id, type, accounts(name, icon_url))`
        )
        .eq("type", "outflow")
        .eq("user_id", context.rootState.userData.id)
        .gt("transfer_id", 0)
        .order("date", { ascending: false });
      context.commit("setTransfers", transfers.data);
      return transfers.data;
    },

    async getTransfer(context, transferId) {
      const transfer = await supabaseClient
        .from("movements")
        .select(`*, accounts(name), movements(account_id, id)`)
        .eq("id", transferId);
      return transfer.data[0];
    },

    async createTransfer(context, transferData) {
      transferData.user_id = context.rootState.userData.id;

      const { error } = await supabaseClient.rpc("make_transfer", transferData);

      if (error) throw error;
    },

    async editTransfer(context, transferData) {
      const { error } = await supabaseClient
        .from("movements")
        .update({
          date: transferData.date,
          cash: transferData.cash,
          title: transferData.title,
          account_id: transferData.from_account_id,
        })
        .match({ id: transferData.outflow_id });

      if (error) throw error;

      const { error2 } = await supabaseClient
        .from("movements")
        .update({
          date: transferData.date,
          cash: transferData.cash,
          title: transferData.title,
          account_id: transferData.to_account_id,
        })
        .match({ id: transferData.income_id });

      if (error2) throw error2;
    },

    async deleteTransfer(context, transferId) {
      const { error } = await supabaseClient
        .from("movements")
        .delete()
        .match({ id: transferId });

      if (error) throw error;
      context.dispatch("searchTransfers");
      context.dispatch("searchCashboxes", null, { root: true });
    },
  },
};
