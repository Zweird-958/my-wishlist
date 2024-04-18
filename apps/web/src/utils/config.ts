import { z } from "zod"

import { currencySchema } from "@my-wishlist/schemas"

const schema = z.object({
  cookieLanguageKey: z.string(),
  localStorageSessionKey: z.string(),
  defaultNamespace: z.enum(["common", "errors", "forms", "zodErrors"]),
  defaultCurrency: currencySchema,
  defaultFilter: z.enum(["all", "purchased", "notPurchased"]),
})

export type Namespace = z.infer<typeof schema>["defaultNamespace"]
export type Filter = z.infer<typeof schema>["defaultFilter"]
const config = schema.parse({
  cookieLanguageKey: "my-wishlist-language",
  defaultNamespace: "common",
  localStorageSessionKey: "my-wishlist-session",
  defaultCurrency: "DOLLAR",
  defaultFilter: "all",
})

export default config
