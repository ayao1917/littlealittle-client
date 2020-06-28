import { GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { CartForm, CartPlan, CartProduct } from "~/types/cart";

export const state = () => ({
  cartProducts: {} as { [key: string]: CartProduct },
  form: (null as unknown) as CartForm,
});

export type CartState = ReturnType<typeof state>;

export const getters: GetterTree<CartState, RootState> = {
  cartProducts: (state): { [key: string]: CartProduct } => state.cartProducts,
  form: (state): CartForm => state.form,
  planCount: (state): number => Object.keys(state.cartProducts).length,
  planFrom: (state): CartPlan[] => {
    // TODO: simplify this logic
    let plans: CartPlan[] = [];
    Object.keys(state.cartProducts).forEach((salePageId) => {
      Object.keys(state.cartProducts[salePageId].selectedPlans).forEach(
        (id) => {
          const { selectedAccessory, selectedPrimary } = state.cartProducts[
            salePageId
          ].selectedPlans[id];
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
          plans = [
            ...plans,
            {
              accessories,
              details,
              id: parseInt(id, 10),
              type: 0,
            },
          ];
        },
      );
    });
    return plans;
  },
};

export const mutations: MutationTree<CartState> = {
  dropCartProduct: (state, id: number) => {
    delete state.cartProducts[id];
  },
  pushCartProduct: (state, object: { [key: string]: CartProduct }) => {
    // TODO: simplify this logic
    const cartProducts = JSON.parse(JSON.stringify(object));
    const products = state.cartProducts;
    Object.keys(cartProducts).forEach((salePageId) => {
      if (!products[salePageId]) {
        products[salePageId] = cartProducts[salePageId];
      } else {
        Object.keys(cartProducts[salePageId].selectedPlans).forEach((id) => {
          if (!products[salePageId].selectedPlans[id]) {
            products[salePageId].selectedPlans[id] =
              cartProducts[salePageId].selectedPlans[id];
          } else {
            Object.keys(
              cartProducts[salePageId].selectedPlans[id].selectedAccessory,
            ).forEach((key) => {
              if (
                !products[salePageId].selectedPlans[id].selectedAccessory[key]
              ) {
                products[salePageId].selectedPlans[id].selectedAccessory[
                  key
                ] = 0;
              }

              products[salePageId].selectedPlans[id].selectedAccessory[key] +=
                cartProducts[salePageId].selectedPlans[id].selectedAccessory[
                  key
                ];
            });
            Object.keys(
              cartProducts[salePageId].selectedPlans[id].selectedPrimary,
            ).forEach((key) => {
              if (
                !products[salePageId].selectedPlans[id].selectedPrimary[key]
              ) {
                products[salePageId].selectedPlans[id].selectedPrimary[key] = 0;
              }

              products[salePageId].selectedPlans[id].selectedPrimary[key] +=
                cartProducts[salePageId].selectedPlans[id].selectedPrimary[key];
            });
          }
        });
      }
    });
    state.cartProducts = { ...products };
  },
  setForm: (state, form: CartForm) => {
    state.form = {
      ...form,
    };
  },
};
