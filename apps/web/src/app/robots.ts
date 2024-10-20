import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    (process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV) === "production"

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
    sitemap: "https://acme.com/sitemap.xml",
  }
}