import { z } from "zod"

import { config, languages } from "@my-wishlist/i18n/config"

import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "./validators"

export const languageSchema = z.enum(languages)
export const languageSchemaFallback = languageSchema.catch(
  config.defaultLanguage,
)

export const signInSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
})
export const signUpSchema = signInSchema.extend({
  username: usernameValidator,
})

export const nameSchema = z.string().min(1, { message: "required" })
export const urlSchema = z
  .string()
  .url({ message: "invalid" })
  .or(z.literal(""))
export const priceSchema = z.coerce
  .number()
  .int({ message: "invalid" })
  .min(1, { message: "required" })
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

export const shareSchema = z.object({
  username: z.string().min(1, { message: "required" }),
})
