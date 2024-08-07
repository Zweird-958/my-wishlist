import baseConfig from "@my-wishlist/eslint/base"
import nextConfig from "@my-wishlist/eslint/next"
import reactConfig from "@my-wishlist/eslint/react"

/** @type {import('@my-wishlist/eslint').Config} */
export default [
  {
    ignores: [".next"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  {
    files: ["src/api/routes/**/*.ts"],
    rules: {
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  },
]
