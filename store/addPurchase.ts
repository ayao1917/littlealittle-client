import { GetterTree, MutationTree } from "vuex";
import { RootState } from "~/store";
import { AddPurchase } from "~/types/salePage";

export const state = () => ({
  selectedItem: null as AddPurchase | null,
});

export type AddPurchaseState = ReturnType<typeof state>;

export const getters: GetterTree<AddPurchaseState, RootState> = {
  selectedItem: (state): AddPurchase | null => state.selectedItem,
};

export const mutations: MutationTree<AddPurchaseState> = {
  clearItem: (state) => {
    state.selectedItem = null;
  },
  setItem: (state, item: AddPurchase) => {
    state.selectedItem = item;
  },
};
