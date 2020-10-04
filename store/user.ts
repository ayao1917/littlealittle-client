import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { User, ActionLoginPayload, ActionLoginResponse } from "~/types/user";

export const state = () => ({
  loginPending: false as boolean,
  user: (null as unknown) as User,
});

export type UserState = ReturnType<typeof state>;

export const getters: GetterTree<UserState, RootState> = {
  user: (state): User => state.user,
};

export const mutations: MutationTree<UserState> = {
  setLoginPending: (state, loginPending: boolean) => {
    state.loginPending = loginPending;
  },
  setUser: (state, user: User) => {
    state.user = user;
  },
};

export const actions: ActionTree<UserState, RootState> = {
  login({ commit }, payload: ActionLoginPayload) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    const { code, provider, state } = payload;
    const data = {
      code,
      state,
    };
    commit("setLoginPending", true);
    this.$axios
      .$post(`${SERVER_URL}/members/login/${provider}`, data)
      .then((response: ActionLoginResponse) => {
        const { result: info } = response;
        commit("setInfo", info);
        commit("setLoginPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
