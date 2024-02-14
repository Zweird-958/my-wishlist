import { z } from "zod"

const schema = z.object({
  cookieLanguageKey: z.string(),
  localStorageSessionKey: z.string(),
})
const config = schema.parse({
  cookieLanguageKey: "my-wishlist-language",
  localStorageSessionKey: "my-wishlist-session",
})

export default config
