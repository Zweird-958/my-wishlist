import { z } from "zod"

const schema = z.object({
  store: z.object({
    sessionKey: z.string(),
    localeKey: z.string(),
  }),
})

const config = schema.parse({
  store: {
    sessionKey: "my-wishlist-session",
    localeKey: "my-wishlist-locale",
  },
})

export default config
