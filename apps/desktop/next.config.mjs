/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  transpilePackages: ["@my-wishlist/ui"],
}

export default nextConfig
