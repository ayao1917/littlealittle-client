import { NuxtAxiosInstance } from "@nuxtjs/axios";

// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;
  $axios.onRequest((config) => {
    console.log(`Making request to ${config.url}`);
  });
}

export { $axios };
