import { z } from "zod"

export const stringBooleanSchema = z
  .boolean()
  .or(z.enum(["true", "false"]).transform((v) => v === "true"))

export const nameSchema = z.string().min(1, { message: "required" })
export const urlSchema = z
  .string()
  .url({ message: "invalid" })
  .or(z.literal(""))
export const priceSchema = z.coerce.number().min(0.01, { message: "minimum" })
export const currencySchema = z.enum(["DOLLAR", "EURO", "POUND"])
export const isPrivateSchema = stringBooleanSchema
export const purchasedSchema = stringBooleanSchema

export const addWishSchema = z.object({
  name: nameSchema,
  url: urlSchema,
  price: priceSchema,
  currency: currencySchema,
  isPrivate: isPrivateSchema
    .or(z.literal("").transform(() => false))
    .default(false),
  purchased: purchasedSchema
    .or(z.literal("").transform(() => false))
    .default(false),
})

export const editWishSchema = z.object({
  name: nameSchema.optional(),
  url: urlSchema.optional(),
  price: priceSchema.optional(),
  currency: currencySchema.optional(),
  isPrivate: isPrivateSchema.or(z.literal("")).optional(),
  purchased: purchasedSchema.or(z.literal("")).optional(),
})

export const wishFormSchema = z.object({
  name: z.string().default(""),
  price: z.number().default(0),
  url: z.string().default(""),
  purchased: z.boolean().default(false),
  isPrivate: z.boolean().default(false),
})
