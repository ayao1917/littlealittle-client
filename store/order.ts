import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { ActionCreateOrderPayload } from "~/types/order";

export const state = () => ({
  orderCreatePending: false as boolean,
});

export type OrderState = ReturnType<typeof state>;

export const getters: GetterTree<OrderState, RootState> = {
  orderCreatePending: (state): boolean => state.orderCreatePending,
};

export const mutations: MutationTree<OrderState> = {
  setOrderCreatePending: (state, orderCreatePending: boolean) => {
    state.orderCreatePending = orderCreatePending;
  },
};

export const actions: ActionTree<OrderState, RootState> = {
  createOrder({ commit }, payload: ActionCreateOrderPayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    const { data } = payload;
    commit("setOrderCreatePending", true);
    this.$axios
      .$post(`${BASE_URL}/branches/${BRANCH}/orders/`, data)
      .then(() => {
        commit("setOrderCreatePending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
