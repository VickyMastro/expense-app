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
      return transfers.data
    },

    async createTransfer(context, transferData) {
      transferData.user_id = context.rootState.userData.id;

      const { error } = await supabaseClient.rpc("make_transfer", transferData);

      if (error) throw error;
    },

    async deleteTransfer(context, transferId) {
      const { error } = await supabaseClient
        .from("movements")
        .delete()
        .match({ id: transferId })

      if (error) throw error;
      context.dispatch("searchTransfers");
      context.dispatch("searchCashboxes", null, { root: true });
    },
  },
};
