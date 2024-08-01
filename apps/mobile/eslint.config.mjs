import baseConfig from "@my-wishlist/eslint/base"
import reactConfig from "@my-wishlist/eslint/react"

/** @type {import('@my-wishlist/eslint').Config} */
export default [
  {
    ignores: [".expo"],
  },
  ...baseConfig,
  ...reactConfig,
]
