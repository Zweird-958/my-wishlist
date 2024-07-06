import { z } from "zod"

export const nameSchema = z.string().min(1, { message: "required" })
export const urlSchema = z
  .string()
  .url({ message: "invalid" })
  .or(z.literal(""))
export const priceSchema = z.coerce.number().min(0.01, { message: "minimum" })
export const currencySchema = z.enum(["DOLLAR", "EURO", "POUND"])
export const isPrivateSchema = z.boolean()
export const purchasedSchema = z.boolean()
export const addWishSchema = z.object({
  name: nameSchema,
  url: urlSchema,
  price: priceSchema,
  currency: currencySchema,
  isPrivate: isPrivateSchema,
  purchased: purchasedSchema,
})
