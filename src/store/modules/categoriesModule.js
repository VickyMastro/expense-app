import { supabaseClient } from "@/supabase/Client.js";
export default {
  state: {
    categories: [],
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
  },
  mutations: {
    setCategories(state, category) {
      state.categories = category;
    },
  },
  actions: {
    async searchCategories(context) {
      const categories = await supabaseClient
        .from("categories")
        .select("*")
        .order("user_id", { ascending: false });

      context.commit("setCategories", categories.data);
    },

    async createCategory(context, categoryData) {
      categoryData.user_id = context.rootState.userData.id;

      const { error } = await supabaseClient
        .from("categories")
        .insert([categoryData]);

      if (error) throw error;
      context.dispatch("searchCategories", null, { root: true });
    },

    async deleteCategory(context, categoryId) {
      const { error } = await supabaseClient
        .from("categories")
        .delete()
        .match({ id: categoryId });

      if (error) throw error;

      context.dispatch("searchCategories", null, { root: true });
    },
  },
};
