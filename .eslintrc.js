module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    // parser: 'babel-eslint'
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: [
    "prettier",
  ],
  // add your custom rules here
  rules: {
    "camelcase": 0,
    "comma-dangle": ["error", "always-multiline"],
    "handle-callback-err": 0,
    "no-await-in-loop": 0,
    "no-duplicate-imports": 0,
    "no-throw-literal": 0,
    "prettier/prettier": ["error", {
      "semi": true,
      "singleQuote": false,
      "trailingComma": "es5",
    }],
    "prefer-template": 2,
    "semi": [2, "always"],
    "sort-vars": ["error", { "ignoreCase": true }],
    "spaced-comment": 2,
    "vue/attribute-hyphenation": "off",
    "vue/no-v-html": "off",
    "vue/no-parsing-error": [2, {
      "invalid-first-character-of-tag-name": false
    }],
    "vue/sort-keys": ["error", "asc", {
      "caseSensitive": true,
      "ignoreChildrenOf": ["model"],
      "ignoreGrandchildrenOf": ["computed", "directives", "inject", "props", "watch"],
      "minKeys": 2,
      "natural": false
    }],
  },
};
