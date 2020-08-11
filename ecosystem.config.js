/* eslint-disable vue/sort-keys */
module.exports = {
  apps: [
    {
      name: "Lazyworker-Little",
      exec_mode: "cluster",
      instances: "max", // Or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
