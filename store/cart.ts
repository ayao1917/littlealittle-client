import { GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { CartForm, CartPlan, SelectedPlans } from "~/types/cart";

export const state = () => ({
  cartPlan: {} as SelectedPlans,
  form: (null as unknown) as CartForm,
});

export type CartState = ReturnType<typeof state>;

export const getters: GetterTree<CartState, RootState> = {
  cartPlan: (state): SelectedPlans => state.cartPlan,
  form: (state): CartForm => state.form,
  planFrom: (state): CartPlan[] =>
    Object.keys(state.cartPlan).map((id) => {
      const { selectedAccessory, selectedPrimary } = state.cartPlan[id];
      const details = Object.keys(selectedPrimary).map((goodsId) => {
        return {
          goodsId: parseInt(goodsId, 10),
          quantity: selectedPrimary[goodsId],
        };
      });
      const accessories = Object.keys(selectedAccessory).map((goodsId) => {
        return {
          goodsId: parseInt(goodsId, 10),
          quantity: selectedAccessory[goodsId],
        };
      });
      return {
        accessories,
        details,
        id: parseInt(id, 10),
        type: 0,
      };
    }),
};

export const mutations: MutationTree<CartState> = {
  dropCartPlan: (state, id: number) => {
    delete state.cartPlan[id];
  },
  pushCartPlan: (state, plans: SelectedPlans) => {
    Object.keys(plans).forEach((id) => {
      if (!state.cartPlan[id]) {
        state.cartPlan[id] = plans[id];
      } else {
        state.cartPlan[id].selectedAccessory = {
          ...state.cartPlan[id].selectedAccessory,
          ...plans[id].selectedAccessory,
        };
        state.cartPlan[id].selectedPrimary = {
          ...state.cartPlan[id].selectedPrimary,
          ...plans[id].selectedPrimary,
        };
      }
    });
  },
  setCartPlan: (state, plans: SelectedPlans) => {
    state.cartPlan = plans;
  },
  setForm: (state, form: CartForm) => {
    state.form = {
      ...form,
    };
  },
};
