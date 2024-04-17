import { z } from "zod"

import { currencySchema } from "@my-wishlist/schemas"

const schema = z.object({
  cookieLanguageKey: z.string(),
  localStorageSessionKey: z.string(),
  defaultNamespace: z.enum(["common", "errors", "forms", "zodErrors"]),
  defaultCurrency: currencySchema,
})

export type Namespace = z.infer<typeof schema>["defaultNamespace"]
const config = schema.parse({
  cookieLanguageKey: "my-wishlist-language",
  defaultNamespace: "common",
  localStorageSessionKey: "my-wishlist-session",
  defaultCurrency: "DOLLAR",
})

export default config
