import baseConfig from "@my-wishlist/eslint/base"
import nextConfig from "@my-wishlist/eslint/next"
import reactConfig from "@my-wishlist/eslint/react"

/** @type {import('@my-wishlist/eslint').Config} */
export default [
  {
    ignores: [".next", "src-tauri", "out"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
]
