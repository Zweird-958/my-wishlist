import { z } from "zod"

import { currencySchema } from "@my-wishlist/schemas"

const schema = z.object({
  defaultCurrency: currencySchema,
  defaultFilter: z.enum(["all", "private", "notPrivate"]),
  defaultSort: z.enum(["date", "priceAsc", "priceDesc"]),
})

export type Filter = z.infer<typeof schema>["defaultFilter"]
export type Sort = z.infer<typeof schema>["defaultSort"]

const config = schema.parse({
  defaultCurrency: "DOLLAR",
  defaultFilter: "all",
  defaultSort: "date",
})

export default config
