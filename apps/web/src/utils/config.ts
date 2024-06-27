import { z } from "zod"

const schema = z.object({
  localStorageSessionKey: z.string(),
})

const config = schema.parse({
  localStorageSessionKey: "my-wishlist-session",
})

export default config
