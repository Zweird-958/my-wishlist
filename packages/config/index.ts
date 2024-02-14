import { z } from "zod"

export const languages = ["en", "fr"] as const
const schema = z.object({
  defaultLanguage: z.enum(languages).default("en"),
  languages: z.array(z.enum(languages)),
})

export type Locale = z.infer<typeof schema>["defaultLanguage"]
const config = schema.parse({
  defaultLanguage: "en",
  languages,
})

export default config
