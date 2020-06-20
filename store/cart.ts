import { GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { CartForm, CartPlan, SelectedPlans } from "~/types/cart";

export const state = () => ({
  cartPlan: (null as unknown) as SelectedPlans,
  form: (null as unknown) as CartForm,
});

export type CartState = ReturnType<typeof state>;

export const getters: GetterTree<CartState, RootState> = {
  cartPlan: (state): SelectedPlans => state.cartPlan,
  form: (state): CartForm => state.form,
  planCount: (state): number =>
    state.cartPlan ? Object.keys(state.cartPlan).length : 0,
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
    if (!state.cartPlan) {
      state.cartPlan = plans;
    } else {
      Object.keys(plans).forEach((id) => {
        if (!state.cartPlan[id]) {
          state.cartPlan[id] = plans[id];
        } else {
          Object.keys(plans[id].selectedAccessory).forEach((key) => {
            state.cartPlan[id].selectedAccessory[key] = state.cartPlan[id]
              .selectedAccessory[key]
              ? state.cartPlan[id].selectedAccessory[key] +
                plans[id].selectedAccessory[key]
              : plans[id].selectedAccessory[key];
          });
          Object.keys(plans[id].selectedPrimary).forEach((key) => {
            state.cartPlan[id].selectedPrimary[key] = state.cartPlan[id]
              .selectedPrimary[key]
              ? state.cartPlan[id].selectedPrimary[key] +
                plans[id].selectedPrimary[key]
              : plans[id].selectedPrimary[key];
          });
        }
      });
    }
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
