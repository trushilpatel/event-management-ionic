module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended"],
  plugins: ["import"],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          ["index", "parent", "sibling"],
        ],
        pathGroups: [{ pattern: "~/**", group: internal }],
      },
    ],
  },
};
