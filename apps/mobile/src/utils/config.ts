import { z } from "zod"

const schema = z.object({
  store: z.object({
    session: z.string(),
    language: z.string(),
    theme: z.string(),
  }),
})

const config = schema.parse({
  store: {
    session: "my-wishlist-session",
    language: "my-wishlist-language",
    theme: "my-wishlist-theme",
  },
})

export default config
