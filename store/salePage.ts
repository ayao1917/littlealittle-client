import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import {
  AddPurchase,
  ActionGetAddPurchasesResponse,
  ActionGetSalePageResponse,
  ActionGetSalePagePayload,
  ActionGetSalePagesResponse,
  ActionGetSalePagesPayload,
  SalePage,
} from "~/types/salePage";

export const state = () => ({
  addPurchases: [] as AddPurchase[],
  addPurchasesGetPending: false as boolean,
  newItems: [] as SalePage[],
  recentPriceOff: [] as SalePage[],
  salePage: (null as unknown) as SalePage,
  salePageGetPending: false as boolean,
  salePages: [] as SalePage[],
  salePagesGetPending: false as boolean,
  topTen: [] as SalePage[],
});

export type SalePageState = ReturnType<typeof state>;

export const getters: GetterTree<SalePageState, RootState> = {
  addPurchases: (state): AddPurchase[] => state.addPurchases,
  addPurchasesGetPending: (state): boolean => state.addPurchasesGetPending,
  newItems: (state): SalePage[] => state.newItems,
  recentPriceOff: (state): SalePage[] => state.recentPriceOff,
  salePage: (state): SalePage => state.salePage,
  salePageGetPending: (state): boolean => state.salePageGetPending,
  salePages: (state): SalePage[] => state.salePages,
  salePagesGetPending: (state): boolean => state.salePagesGetPending,
  topTen: (state): SalePage[] => state.topTen,
};

export const mutations: MutationTree<SalePageState> = {
  setAddPurchases: (state, addPurchases: AddPurchase[]) => {
    state.addPurchases = addPurchases;
  },
  setAddPurchasesGetPending: (state, addPurchasesGetPending: boolean) => {
    state.addPurchasesGetPending = addPurchasesGetPending;
  },
  setNewItems: (state, newItems: SalePage[]) => {
    state.newItems = newItems;
  },
  setRecentPriceOff: (state, recentPriceOff: SalePage[]) => {
    state.recentPriceOff = recentPriceOff;
  },
  setSalePage: (state, salePage: SalePage) => {
    state.salePage = salePage;
  },
  setSalePageGetPending: (state, salePageGetPending: boolean) => {
    state.salePageGetPending = salePageGetPending;
  },
  setSalePages: (state, salePages: SalePage[]) => {
    state.salePages = salePages;
  },
  setTopTen: (state, topTen: SalePage[]) => {
    state.topTen = topTen;
  },
};

export const actions: ActionTree<SalePageState, RootState> = {
  getAddPurchases({ commit }) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    commit("setAddPurchasesGetPending", true);
    this.$axios
      .$get(`${SERVER_URL}/branches/${BRANCH}/add_purchases`)
      .then((response: ActionGetAddPurchasesResponse) => {
        const { result } = response;
        const { addPurchases } = result;
        commit("setAddPurchases", addPurchases);
        commit("setAddPurchasesGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
  getSalePage({ commit }, payload: ActionGetSalePagePayload) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    const { alias } = payload;
    commit("setSalePageGetPending", true);
    this.$axios
      .$get(`${SERVER_URL}/branches/${BRANCH}/salePages/${alias}`)
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
  getSalePages({ commit }, payload: ActionGetSalePagesPayload) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    const { type, ...params } = payload;
    if (!SERVER_URL || !BRANCH) return;
    commit("setSalePageGetPending", true);
    this.$axios
      .$get(`${SERVER_URL}/branches/${BRANCH}/salePages`, {
        params: { ...params },
      })
      .then((response: ActionGetSalePagesResponse) => {
        const { result } = response;
        const { salePages } = result;
        switch (type) {
          case "NewItems":
            commit("setNewItems", salePages);
            break;

          case "RecentPriceOff":
            commit("setRecentPriceOff", salePages);
            break;

          case "TopTen":
            commit("setTopTen", salePages);
            break;

          case "Default":
          default:
            commit("setSalePages", salePages);
        }
        commit("setSalePageGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
