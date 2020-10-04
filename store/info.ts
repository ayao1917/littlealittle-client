import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { Info, ActionGetInfoResponse } from "~/types/info";

export const state = () => ({
  info: (null as unknown) as Info,
  infoGetPending: false as boolean,
});

export type InfoState = ReturnType<typeof state>;

export const getters: GetterTree<InfoState, RootState> = {
  info: (state): Info => state.info,
};

export const mutations: MutationTree<InfoState> = {
  setInfo: (state, info: Info) => {
    state.info = info;
  },
  setInfoGetPending: (state, infoGetPending: boolean) => {
    state.infoGetPending = infoGetPending;
  },
};

export const actions: ActionTree<InfoState, RootState> = {
  getInfo({ commit }) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    commit("setInfoGetPending", true);
    this.$axios
      .$get(`${SERVER_URL}/branches/${BRANCH}/info`)
      .then((response: ActionGetInfoResponse) => {
        const { result: info } = response;
        commit("setInfo", info);
        commit("setInfoGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
