import { defineConfig } from "eslint/config";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Estilo
      "linebreak-style": ["error", "unix"],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-trailing-spaces": "error",
      "space-in-parens": ["error", "never"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-before-blocks": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],

      // Qualidade de código
      "no-unused-vars": ["warn"],
      "no-undef": "error",
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      "prefer-const": "error",

      // Organização de imports
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Prettier como regra ESLint
      "prettier/prettier": "error",
    },
  },
]);