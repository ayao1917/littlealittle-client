/* eslint-disable vue/sort-keys, @typescript-eslint/no-unused-vars */
const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "babel-loader",
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
    {
      test: /\.s?css$/,
      use: [
        "vue-style-loader",
        { loader: "css-loader", options: { importLoaders: 1 } },
        "sass-loader",
      ],
    },
  );
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
