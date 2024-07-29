import pluginQuery from "@tanstack/eslint-plugin-query"
import reactPlugin from "eslint-plugin-react"
import hooksPlugin from "eslint-plugin-react-hooks"

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]
