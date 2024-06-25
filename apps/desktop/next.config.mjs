/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  transpilePackages: ["@my-wishlist/ui"],
}

export default nextConfig
