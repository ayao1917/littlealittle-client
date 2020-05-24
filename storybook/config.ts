import { configure } from "@storybook/vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import Vue from "vue";
// import Vuex from 'vuex'; // Vue plugins

const req = require.context("./stories", true, /\.storybook\.ts$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
