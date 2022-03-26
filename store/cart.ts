import { GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { CartAddPurchase, CartPlan, CartProduct } from "~/types/cart";
import { AddPurchase } from "~/types/salePage";
import { createCartPlanData, mergeCartProduct } from "~/utils/cart";

const setAddPurchases = (
  state: CartState,
  addPurchases: Record<string, CartAddPurchase>,
) => {
  state.cartAddPurchases = addPurchases;
  if (typeof window !== "undefined") {
    localStorage.setItem("cartAddPurchases", JSON.stringify(addPurchases));
  }
};

const getAddPurchases = (state: CartState): Record<string, CartAddPurchase> => {
  let result = state.cartAddPurchases;
  if (typeof window !== "undefined") {
    const dataString = localStorage.getItem("cartAddPurchases") ?? "{}";
    result = JSON.parse(dataString);
  }
  return result;
};

const setProducts = (
  state: CartState,
  products: Record<string, CartProduct>,
) => {
  state.cartProducts = products;
  if (typeof window !== "undefined") {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }
};

const getProducts = (state: CartState): Record<string, CartProduct> => {
  let result = state.cartProducts;
  if (typeof window !== "undefined") {
    const dataString = localStorage.getItem("cartProducts") ?? "{}";
    result = JSON.parse(dataString);
  }
  return result;
};

export const state = () => ({
  cartAddPurchases: {} as { [key: string]: CartAddPurchase },
  cartProducts: {} as { [key: string]: CartProduct },
});

export type CartState = ReturnType<typeof state>;

export const getters: GetterTree<CartState, RootState> = {
  addPurchaseForm: (state): CartPlan[] => {
    const cartAddPurchases = getAddPurchases(state);
    return Object.keys(cartAddPurchases).map((key: string) => {
      const { addPurchase, quantity } = cartAddPurchases[key];
      return {
        details: [
          {
            goodsId: parseInt(addPurchase.goodsId),
            quantity,
          },
        ],
        id: parseInt(key),
        type: 1,
      };
    });
  },
  cartAddPurchases: (state): { [key: string]: CartAddPurchase } =>
    getAddPurchases(state),
  cartCurrency: (state): number | null => {
    const cartProducts = getProducts(state);
    const key = Object.keys(cartProducts)[0];
    if (!key) {
      return null;
    }

    const salePage = cartProducts[key].salePage;
    return salePage.currency.id;
  },
  cartProducts: (state): { [key: string]: CartProduct } => getProducts(state),
  planCount: (state): number => Object.keys(getProducts(state)).length,
  planFrom: (state): CartPlan[] => {
    return createCartPlanData(getProducts(state));
  },
};

export const mutations: MutationTree<CartState> = {
  clearAddPurchase: (state) => {
    setAddPurchases(state, {});
  },
  clearCart: (state) => {
    setProducts(state, {});
    setAddPurchases(state, {});
  },
  dropAddPurchase: (state, id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: _, ...rest } = getAddPurchases(state);
    setAddPurchases(state, { ...rest });
  },
  dropCartProduct: (state, id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: _, ...rest } = getProducts(state);
    setProducts(state, { ...rest });
  },
  pushAddPurchase: (
    state,
    payload: { addPurchase: AddPurchase; amount: number },
  ) => {
    const { addPurchase, amount } = payload;
    const { id } = addPurchase;
    const itemAmount = amount ?? 1;
    let newAddPurchase = {};
    const cartAddPurchases = getAddPurchases(state);
    if (!cartAddPurchases[id]) {
      newAddPurchase = {
        addPurchase,
        quantity: itemAmount,
      };
    } else {
      newAddPurchase = {
        addPurchase,
        quantity: cartAddPurchases[id].quantity + itemAmount,
      };
    }
    setAddPurchases(state, {
      ...cartAddPurchases,
      [id]: newAddPurchase,
    });
  },
  pushCartProduct: (state, object: { [key: string]: CartProduct }) => {
    const cartProducts = JSON.parse(JSON.stringify(object));
    const products = mergeCartProduct(getProducts(state), cartProducts);
    setProducts(state, { ...products });
  },
  setCartAddPurchase: (state, cart: { [key: string]: CartAddPurchase }) => {
    setAddPurchases(state, {
      ...cart,
    });
  },
  setCartProducts: (state, cart: { [key: string]: CartProduct }) => {
    setProducts(state, {
      ...cart,
    });
  },
};
