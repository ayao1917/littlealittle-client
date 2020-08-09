import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { Banner, ActionGetBannersResponse } from "~/types/banner";

export const state = () => ({
  banners: [] as Banner[],
  bannersGetPending: false as boolean,
});

export type BannerState = ReturnType<typeof state>;

export const getters: GetterTree<BannerState, RootState> = {
  sortedBanners: (state): Banner[] => {
    const bannerList = state.banners.slice();
    bannerList.sort((a: Banner, b: Banner) => a.sort - b.sort);
    return bannerList;
  },
};

export const mutations: MutationTree<BannerState> = {
  setBanners: (state, banners: Banner[]) => {
    state.banners = banners;
  },
  setBannersGetPending: (state, bannersGetPending: boolean) => {
    state.bannersGetPending = bannersGetPending;
  },
};

export const actions: ActionTree<BannerState, RootState> = {
  getBanners({ commit }) {
    const SERVER_URL = process.env.SERVER_URL;
    if (!SERVER_URL) return;
    commit("setBannersGetPending", true);
    this.$axios
      .$get(`${SERVER_URL}/sliders`)
      .then((response: ActionGetBannersResponse) => {
        const { result } = response;
        const { sliders } = result;
        commit("setBanners", sliders);
        commit("setBannersGetPending", false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
