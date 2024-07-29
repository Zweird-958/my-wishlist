import baseConfig from "@my-wishlist/eslint/base"

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next"],
  },
  ...baseConfig,
]
