/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  transpilePackages: [
    "@my-wishlist/ui",
    "@my-wishlist/config",
    "@my-wishlist/db",
    "@my-wishlist/i18n",
    "@my-wishlist/schemas",
    "@my-wishlist/types",
  ],
}

export default nextConfig
