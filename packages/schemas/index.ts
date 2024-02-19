import { z } from "zod"

import config, { languages } from "@my-wishlist/config"

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
