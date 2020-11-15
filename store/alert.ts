import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

export const state = () => ({
  alertTitle: "",
  alertType: "",
  isShowAlert: false,
});

export type AlertState = ReturnType<typeof state>;

export const getters: GetterTree<AlertState, RootState> = {
  alertTitle: (state): string => state.alertTitle,
  alertType: (state): string => state.alertType,
  isShowAlert: (state): boolean => state.isShowAlert,
};

export const mutations: MutationTree<AlertState> = {
  hideAlert: (state) => {
    state.isShowAlert = false;
  },
  showAlert: (state, payload: { title: string; type: string }) => {
    const { title, type } = payload;
    state.alertTitle = title;
    state.alertType = type;
    state.isShowAlert = true;
  },
};

export const actions: ActionTree<AlertState, RootState> = {
  hideAlert({ commit }) {
    setTimeout(() => {
      commit("hideAlert");
    }, 3000);
  },
  triggerAlert({ commit, dispatch }, payload: { title: string; type: string }) {
    commit("showAlert", payload);
    return dispatch("hideAlert");
  },
};
