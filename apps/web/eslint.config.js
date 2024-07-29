import baseConfig from "@my-wishlist/eslint/base"
import nextConfig from "@my-wishlist/eslint/next"
import reactConfig from "@my-wishlist/eslint/react"

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  {
    ignores: [".next"],
    files: ["src/api/routes/**/*.ts"],
    rules: {
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  },
]
