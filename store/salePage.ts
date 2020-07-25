import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import {
  SalePage,
  ActionGetSalePageResponse,
  ActionGetSalePagePayload,
  ActionGetSalePagesResponse,
  ActionGetSalePagesPayload,
} from "~/types/salePage";

export const state = () => ({
  newItems: [] as SalePage[],
  newItemsGetPending: false as boolean,
  recentPriceOff: [] as SalePage[],
  recentPriceOffGetPending: false as boolean,
  salePage: (null as unknown) as SalePage,
  salePageGetPending: false as boolean,
  topTen: [] as SalePage[],
  topTenGetPending: false as boolean,
});

export type SalePageState = ReturnType<typeof state>;

export const getters: GetterTree<SalePageState, RootState> = {
  newItems: (state): SalePage[] => state.newItems,
  newItemsGetPending: (state): boolean => state.newItemsGetPending,
  recentPriceOff: (state): SalePage[] => state.recentPriceOff,
  recentPriceOffGetPending: (state): boolean => state.recentPriceOffGetPending,
  salePage: (state): SalePage => state.salePage,
  salePageGetPending: (state): boolean => state.salePageGetPending,
  topTen: (state): SalePage[] => state.topTen,
  topTenGetPending: (state): boolean => state.topTenGetPending,
};

export const mutations: MutationTree<SalePageState> = {
  setNewItems: (state, newItems: SalePage[]) => {
    state.newItems = newItems;
  },
  setNewItemsGetPending: (state, newItemsGetPending: boolean) => {
    state.newItemsGetPending = newItemsGetPending;
  },
  setRecentPriceOff: (state, recentPriceOff: SalePage[]) => {
    state.recentPriceOff = recentPriceOff;
  },
  setRecentPriceOffGetPending: (state, recentPriceOffGetPending: boolean) => {
    state.recentPriceOffGetPending = recentPriceOffGetPending;
  },
  setSalePage: (state, salePage: SalePage) => {
    state.salePage = salePage;
  },
  setSalePageGetPending: (state, salePageGetPending: boolean) => {
    state.salePageGetPending = salePageGetPending;
  },
  setTopTen: (state, topTen: SalePage[]) => {
    state.topTen = topTen;
  },
  setTopTenGetPending: (state, topTenGetPending: boolean) => {
    state.topTenGetPending = topTenGetPending;
  },
};

export const actions: ActionTree<SalePageState, RootState> = {
  getNewItems({ commit }, payload: ActionGetSalePagesPayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    commit("setNewItemsGetPending", true);
    this.$axios
      .$get(`${BASE_URL}/branches/${BRANCH}/salePages`, {
        params: { ...payload },
      })
      .then((response: ActionGetSalePagesResponse) => {
        const { result } = response;
        const { salePages } = result;
        commit("setNewItems", salePages);
        commit("setNewItemsGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  getRecentPriceOff({ commit }, payload: ActionGetSalePagesPayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    commit("setRecentPriceOffGetPending", true);
    this.$axios
      .$get(`${BASE_URL}/branches/${BRANCH}/salePages`, {
        params: { ...payload },
      })
      .then((response: ActionGetSalePagesResponse) => {
        const { result } = response;
        const { salePages } = result;
        commit("setRecentPriceOff", salePages);
        commit("setRecentPriceOffGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  getSalePage({ commit }, payload: ActionGetSalePagePayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    const { alias } = payload;
    commit("setSalePageGetPending", true);
    this.$axios
      .$get(`${BASE_URL}/branches/${BRANCH}/salePages/${alias}`)
      .then((response: ActionGetSalePageResponse) => {
        const { result } = response;
        const { salePage } = result;
        commit("setSalePage", salePage);
        commit("setSalePageGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  getTopTen({ commit }, payload: ActionGetSalePagesPayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    commit("setTopTenGetPending", true);
    this.$axios
      .$get(`${BASE_URL}/branches/${BRANCH}/salePages`, {
        params: { ...payload },
      })
      .then((response: ActionGetSalePagesResponse) => {
        const { result } = response;
        const { salePages } = result;
        commit("setTopTen", salePages);
        commit("setTopTenGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
