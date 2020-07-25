import { GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { CartPlan, CartProduct } from "~/types/cart";

export const state = () => ({
  cartProducts: {} as { [key: string]: CartProduct },
});

export type CartState = ReturnType<typeof state>;

export const getters: GetterTree<CartState, RootState> = {
  cartCurrency: (state): number | null => {
    const key = Object.keys(state.cartProducts)[0];
    if (!key) {
      return null;
    }

    const salePage = state.cartProducts[key].salePage;
    return salePage.currency.id;
  },
  cartProducts: (state): { [key: string]: CartProduct } => state.cartProducts,
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
          const details = Object.keys(selectedPrimary)
            .filter((goodsId) => selectedPrimary[goodsId] > 0)
            .map((goodsId) => {
              return {
                goodsId: parseInt(goodsId, 10),
                quantity: selectedPrimary[goodsId],
              };
            });
          const accessories = Object.keys(selectedAccessory)
            .filter((goodsId) => selectedAccessory[goodsId] > 0)
            .map((goodsId) => {
              return {
                goodsId: parseInt(goodsId, 10),
                quantity: selectedAccessory[goodsId],
              };
            });

          if (accessories.length > 0 && details.length > 0) {
            plans = [
              ...plans,
              {
                accessories,
                details,
                id: parseInt(id, 10),
                type: 0,
              },
            ];
          }
        },
      );
    });
    return plans;
  },
};

export const mutations: MutationTree<CartState> = {
  dropCartProduct: (state, id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: _, ...rest } = state.cartProducts;
    state.cartProducts = {
      ...rest,
    };
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
  setCart: (state, cart: { [key: string]: CartProduct }) => {
    state.cartProducts = {
      ...cart,
    };
  },
};
