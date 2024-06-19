import { z } from "zod"

import { currencySchema } from "@my-wishlist/schemas"

const schema = z.object({
  localStorageSessionKey: z.string(),
  defaultCurrency: currencySchema,
  defaultFilter: z.enum(["all", "purchased", "notPurchased"]),
  defaultSort: z.enum(["date", "priceAsc", "priceDesc"]),
})

export type Filter = z.infer<typeof schema>["defaultFilter"]
export type Sort = z.infer<typeof schema>["defaultSort"]

const config = schema.parse({
  localStorageSessionKey: "my-wishlist-session",
  defaultCurrency: "DOLLAR",
  defaultFilter: "all",
  defaultSort: "date",
})

export default config
