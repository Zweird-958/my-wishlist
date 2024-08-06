import { z } from "zod"

const schema = z.object({
  store: z.object({
    session: z.string(),
  }),
})

const config = schema.parse({
  store: {
    session: "my-wishlist-session",
  },
})

export default config
