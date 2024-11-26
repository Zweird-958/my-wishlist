import type { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => {
  const isProduction =
    (process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV) ===
    "production"

  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  }
}

export default robots
