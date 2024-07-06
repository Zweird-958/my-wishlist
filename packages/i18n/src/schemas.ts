import { z } from "zod"

import config, { languages } from "./config"

export const languageSchema = z.enum(languages)
export const languageSchemaFallback = languageSchema.catch(
  config.defaultLanguage,
)
