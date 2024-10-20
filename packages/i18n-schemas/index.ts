import { z } from "zod"

import { config, languages } from "@my-wishlist/config/i18n"

export const languageSchema = z.enum(languages)
export const languageSchemaFallback = languageSchema.catch(
  config.defaultLanguage,
)
