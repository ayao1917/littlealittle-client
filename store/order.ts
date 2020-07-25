import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import {
  ActionCreateOrderPayload,
  ActionCreateOrderResponse,
} from "~/types/order";

export const state = () => ({
  createdOrderId: (null as unknown) as string,
  orderCreatePending: false as boolean,
});

export type OrderState = ReturnType<typeof state>;

export const getters: GetterTree<OrderState, RootState> = {
  createdOrderId: (state): string => state.createdOrderId,
  orderCreatePending: (state): boolean => state.orderCreatePending,
};

export const mutations: MutationTree<OrderState> = {
  setCreatedOrderId: (state, createdOrderId: string) => {
    state.createdOrderId = createdOrderId;
  },
  setOrderCreatePending: (state, orderCreatePending: boolean) => {
    state.orderCreatePending = orderCreatePending;
  },
};

export const actions: ActionTree<OrderState, RootState> = {
  createOrder({ commit }, payload: ActionCreateOrderPayload) {
    const BASE_URL = process.env.BASE_URL;
    const BRANCH = process.env.BRANCH;
    if (!BASE_URL || !BRANCH) return;
    const { callback, data } = payload;
    commit("setOrderCreatePending", true);
    this.$axios
      .$post(`${BASE_URL}/branches/${BRANCH}/orders/`, data)
      .then((response: ActionCreateOrderResponse) => {
        commit("setOrderCreatePending", false);
        commit("setCreatedOrderId", response.result.orderNo);
        callback();
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
