import globals from "globals";
import parse from "@typescript-eslint/parser";

export default [
  {
    files: [
      "src/**/*.@(js|cjs|mjs|ts)",
      "tests/**/*.@(js|cjs|mjs|ts)",
    ],
    rules: {
      "array-bracket-newline": ["error", "consistent"],
      "array-bracket-spacing": "error",
      "array-element-newline": ["error", "consistent"],
      "arrow-spacing": "error",
      "brace-style": "error",
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": "error",
      "comma-style": "error",
      "dot-location": ["error", "property"],
      eqeqeq: ["error", "always"],
      "eol-last": "error",
      indent: ["error", 2],
      "key-spacing": "error",
      "keyword-spacing": "error",
      "linebreak-style": "error",
      "no-multiple-empty-lines": ["error", {
        "max": 1,
        "maxBOF": 0,
        "maxEOF": 1,
      }],
      "no-restricted-imports": ["error", {
        "patterns": [".*"],
      }],
      "no-tabs": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": "error",
      quotes: "error",
      semi: ["error", "always"],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      parser: parse,
      parserOptions: {
        allowReserved: false,
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: false,
        },
      },
      sourceType: "module",
    },
  },
];
