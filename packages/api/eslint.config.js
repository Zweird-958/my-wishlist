import baseConfig from "@my-wishlist/eslint/base"

/** @type {import('@my-wishlist/eslint').Config} */
export default [
  ...baseConfig,
  {
    files: ["src/routes/**/*.ts"],
    rules: {
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  },
]
