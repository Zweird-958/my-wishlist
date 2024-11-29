/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
      },
      {
        protocol: process.env.S3_PROTOCOL,
        hostname: process.env.S3_HOSTNAME,
        port: process.env.S3_PORT,
      },
    ],
  },
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
