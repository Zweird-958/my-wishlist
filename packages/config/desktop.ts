import { z } from "zod"

const schema = z.object({
  store: z.object({
    sessionKey: z.string(),
    name: z.string(),
  }),
})

export const config = schema.parse({
  store: {
    sessionKey: "my-wishlist-session",
    name: "store.bin",
  },
})
