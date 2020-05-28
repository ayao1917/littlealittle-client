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
  salePage: (null as unknown) as SalePage,
  salePageGetPending: false as boolean,
  salePages: [] as SalePage[],
  salePagesGetPending: false as boolean,
});

export type SalePageState = ReturnType<typeof state>;

export const getters: GetterTree<SalePageState, RootState> = {
  salePage: (state): SalePage => state.salePage,
  salePageGetPending: (state): boolean => state.salePageGetPending,
  salePages: (state): SalePage[] => state.salePages,
  salePagesGetPending: (state): boolean => state.salePagesGetPending,
};

export const mutations: MutationTree<SalePageState> = {
  setSalePage: (state, salePage: SalePage) => {
    state.salePage = salePage;
  },
  setSalePageGetPending: (state, salePageGetPending: boolean) => {
    state.salePageGetPending = salePageGetPending;
  },
  setSalePages: (state, salePages: SalePage[]) => {
    state.salePages = salePages;
  },
  setSalePagesGetPending: (state, salePagesGetPending: boolean) => {
    state.salePagesGetPending = salePagesGetPending;
  },
};

export const actions: ActionTree<SalePageState, RootState> = {
  getSalePage({ commit }, payload: ActionGetSalePagePayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    const { alias } = payload;
    commit("setSalePagesGetPending", true);
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
  getSalePages({ commit }, payload: ActionGetSalePagesPayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    commit("setSalePagesGetPending", true);
    this.$axios
      .$get(`${BASE_URL}/branches/${BRANCH}/salePages`, {
        params: { ...payload },
      })
      .then((response: ActionGetSalePagesResponse) => {
        const { result } = response;
        const { salePages } = result;
        commit("setSalePages", salePages);
        commit("setSalePagesGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
