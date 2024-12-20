import { z } from "zod"

export const currencies = ["DOLLAR", "EURO", "POUND"] as const
export const currencySchema = z.enum(currencies)

const schema = z.object({
  currencies: z.array(z.enum(currencies)),
  defaultCurrency: currencySchema,
  defaultFilter: z.enum(["all", "private", "notPrivate"]),
  defaultSort: z.enum(["date", "priceAsc", "priceDesc"]),
})

export type Filter = z.infer<typeof schema>["defaultFilter"]
export type Sort = z.infer<typeof schema>["defaultSort"]

const config = schema.parse({
  currencies,
  defaultCurrency: "DOLLAR",
  defaultFilter: "all",
  defaultSort: "date",
})

export default config
