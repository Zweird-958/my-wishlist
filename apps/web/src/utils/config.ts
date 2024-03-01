import { z } from "zod"

const schema = z.object({
  cookieLanguageKey: z.string(),
  localStorageSessionKey: z.string(),
  defaultNamespace: z.enum(["common", "errors", "forms", "zodErrors"]),
})

export type Namespace = z.infer<typeof schema>["defaultNamespace"]
const config = schema.parse({
  cookieLanguageKey: "my-wishlist-language",
  defaultNamespace: "common",
  localStorageSessionKey: "my-wishlist-session",
})

export default config
