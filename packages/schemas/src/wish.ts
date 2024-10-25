import { z } from "zod"

export const stringBooleanSchema = z
  .boolean()
  .or(z.enum(["true", "false"]).transform((v) => v === "true"))

export const nameSchema = z.string().min(1, { message: "required" })
export const urlSchema = z
  .string()
  .url({ message: "invalid" })
  .or(z.literal(""))
export const priceSchema = z.coerce
  .number({ message: "number" })
  .min(0.01, { message: "minimum" })
export const currencySchema = z.enum(["DOLLAR", "EURO", "POUND"])
export const isPrivateSchema = stringBooleanSchema
export const imageUrlSchema = z.string()
export const imageMobileSchema = z.object({
  uri: imageUrlSchema,
  type: z.string(),
})

export const addWishSchema = z.object({
  name: nameSchema,
  link: urlSchema,
  price: priceSchema,
  currency: currencySchema,
  isPrivate: isPrivateSchema
    .or(z.literal("").transform(() => false))
    .default(false),
  image: imageUrlSchema.optional(),
})

export const getWishSchema = z.object({
  wishId: z.coerce.number(),
})

export const editWishSchema = z.object({
  name: nameSchema.optional(),
  link: urlSchema.optional(),
  price: priceSchema.optional(),
  currency: currencySchema.optional(),
  isPrivate: isPrivateSchema.or(z.literal("")).optional(),
  image: imageUrlSchema.optional(),
})

export const wishFormSchema = z.object({
  name: z.string().default(""),
  price: z.number().default(0),
  link: z.string().default(""),
  isPrivate: z.boolean().default(false),
})
