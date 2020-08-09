import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import {
  SalePage,
  ActionDeleteFavoritesPayload,
  ActionGetFavoritesResponse,
  ActionPostFavoritesPayload,
} from "~/types/salePage";

export const state = () => ({
  favorites: [] as SalePage[],
  favoritesDeletePending: false as boolean,
  favoritesGetPending: false as boolean,
  favoritesPostPending: false as boolean,
});

export type FavoriteState = ReturnType<typeof state>;

export const getters: GetterTree<FavoriteState, RootState> = {
  favorites: (state): SalePage[] => state.favorites,
  favoritesDeletePending: (state): boolean => state.favoritesDeletePending,
  favoritesGetPending: (state): boolean => state.favoritesGetPending,
  favoritesPostPending: (state): boolean => state.favoritesPostPending,
};

export const mutations: MutationTree<FavoriteState> = {
  setFavorites: (state, favorites: SalePage[]) => {
    state.favorites = favorites;
  },
  setFavoritesDeletePending: (state, favoritesDeletePending: boolean) => {
    state.favoritesDeletePending = favoritesDeletePending;
  },
  setFavoritesGetPending: (state, favoritesGetPending: boolean) => {
    state.favoritesGetPending = favoritesGetPending;
  },
  setFavoritesPostPending: (state, favoritesPostPending: boolean) => {
    state.favoritesPostPending = favoritesPostPending;
  },
};

export const actions: ActionTree<FavoriteState, RootState> = {
  deleteFavorite({ commit }, payload: ActionDeleteFavoritesPayload) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    const { salePageId } = payload;
    commit("setFavoritesDeletePending", true);
    this.$axios
      .$delete(
        `${SERVER_URL}/branches/${BRANCH}/favorites/salepages/${salePageId}`,
      )
      .then(() => {
        commit("setFavoritesDeletePending", false);
      });
  },
  getFavorites({ commit }) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    commit("setFavoritesGetPending", true);
    this.$axios
      .$get(`${SERVER_URL}/branches/${BRANCH}/favorites/salepages`)
      .then((response: ActionGetFavoritesResponse) => {
        const { result } = response;
        const { salePages } = result;
        commit("setFavorites", salePages);
        commit("setFavoritesGetPending", false);
      });
  },
  postFavorite({ commit }, payload: ActionPostFavoritesPayload) {
    const SERVER_URL = process.env.SERVER_URL;
    const BRANCH = process.env.BRANCH;
    if (!SERVER_URL || !BRANCH) return;
    const { salePageId } = payload;
    commit("setFavoritesPostPending", true);
    this.$axios
      .$post(
        `${SERVER_URL}/branches/${BRANCH}/favorites/salepages/${salePageId}`,
      )
      .then(() => {
        commit("setFavoritesPostPending", false);
      });
  },
};
