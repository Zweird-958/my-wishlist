import { z } from "zod"

const schema = z.object({
  store: z.object({
    sessionKey: z.string(),
  }),
  languageCookieKey: z.string(),
})

const config = schema.parse({
  store: {
    sessionKey: "my-wishlist-session",
  },
  languageCookieKey: "my-wishlist-language-app",
})

export default config
