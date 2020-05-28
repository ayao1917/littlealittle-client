import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import {
  Category,
  ActionGetCategoriesResponse,
  ActionGetCategoryPayload,
  ActionGetCategoryResponse,
} from "~/types/category";

export const state = () => ({
  categories: [] as Category[],
  categoriesGetPending: false as boolean,
  category: (null as unknown) as Category,
  categoryGetPending: false as boolean,
});

export type CategoryState = ReturnType<typeof state>;

export const getters: GetterTree<CategoryState, RootState> = {
  sortedCategories: (state): Category[] => {
    const categoryList = state.categories.slice();
    categoryList.sort((a: Category, b: Category) => a.sort - b.sort);
    return categoryList;
  },
};

export const mutations: MutationTree<CategoryState> = {
  setCategories: (state, categories: Category[]) => {
    state.categories = categories;
  },
  setCategoriesGetPending: (state, categoriesGetPending: boolean) => {
    state.categoriesGetPending = categoriesGetPending;
  },
  setCategory: (state, category: Category) => {
    state.category = category;
  },
  setCategoryGetPending: (state, categoryGetPending: boolean) => {
    state.categoryGetPending = categoryGetPending;
  },
};

export const actions: ActionTree<CategoryState, RootState> = {
  getCategories({ commit }) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    commit("setCategoriesGetPending", true);
    this.$axios
      .$get(`${BASE_URL}/branches/${BRANCH}/categories`)
      .then((response: ActionGetCategoriesResponse) => {
        const { result } = response;
        const { categories } = result;
        commit("setCategories", categories);
        commit("setCategoriesGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  getCategory({ commit }, payload: ActionGetCategoryPayload) {
    const { categoryId } = payload;
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    commit("setCategoryGetPending", true);
    this.$axios
      .$get(`${BASE_URL}/branches/${BRANCH}/categories/${categoryId}`)
      .then((response: ActionGetCategoryResponse) => {
        const { result } = response;
        const { categories } = result;
        commit("setCategory", categories);
        commit("setCategoryGetPending", false);
      });
  },
};
