import { z } from "zod"

const schema = z.object({
  store: z.object({
    sessionKey: z.string(),
  }),
})

const config = schema.parse({
  store: {
    sessionKey: "my-wishlist-session",
  },
})

export default config
