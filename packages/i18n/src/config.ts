import { z } from "zod"

const schema = z.object({
  cookieLanguageKey: z.string(),
  defaultNamespace: z.enum(["common", "errors", "forms", "zodErrors"]),
  localStorageSessionKey: z.string(),
  localStorageLanguageKey: z.string(),
})

export type Namespace = z.infer<typeof schema>["defaultNamespace"]

const config = schema.parse({
  cookieLanguageKey: "my-wishlist-language",
  defaultNamespace: "common",
  localStorageSessionKey: "my-wishlist-session",
  localStorageLanguageKey: "my-wishlist-language",
})

export default config
