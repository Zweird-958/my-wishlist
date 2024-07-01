import { z } from "zod"

const schema = z.object({
  store: z.object({
    localeKey: z.string(),
    name: z.string(),
  }),
})

export const config = schema.parse({
  store: {
    localeKey: "my-wishlist-locale",
    name: "store.bin",
  },
})
