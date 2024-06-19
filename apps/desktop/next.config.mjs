/** @type {import('next').NextConfig} */
import { experimental_taintObjectReference } from "react"

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  transpilePackages: ["@my-wishlist/ui"],
}

export default nextConfig
