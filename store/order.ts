import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import {
  ActionCreateOrderPayload,
  ActionCreateOrderResponse,
} from "~/types/order";

export const state = () => ({
  createdOrderId: (null as unknown) as string,
  createdOrderPrice: (null as unknown) as number,
  orderCreatePending: false as boolean,
});

export type OrderState = ReturnType<typeof state>;

export const getters: GetterTree<OrderState, RootState> = {
  createdOrderId: (state): string => state.createdOrderId,
  createdOrderPrice: (state): number => state.createdOrderPrice,
  orderCreatePending: (state): boolean => state.orderCreatePending,
};

export const mutations: MutationTree<OrderState> = {
  setCreatedOrderId: (state, createdOrderId: string) => {
    state.createdOrderId = createdOrderId;
  },
  setCreatedOrderPrice: (state, createdOrderPrice: number) => {
    state.createdOrderPrice = createdOrderPrice;
  },
  setOrderCreatePending: (state, orderCreatePending: boolean) => {
    state.orderCreatePending = orderCreatePending;
  },
};

export const actions: ActionTree<OrderState, RootState> = {
  createOrder({ commit }, payload: ActionCreateOrderPayload) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    const { callback, data } = payload;
    commit("setOrderCreatePending", true);
    this.$axios
      .$post(`${SERVER_URL}/branches/${BRANCH}/orders/`, data)
      .then((response: ActionCreateOrderResponse) => {
        const { orderNo, price } = response.result;
        commit("setOrderCreatePending", false);
        commit("setCreatedOrderId", orderNo);
        commit("setCreatedOrderPrice", price);
        callback();
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
