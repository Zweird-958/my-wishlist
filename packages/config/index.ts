import { z } from "zod"

export const languages = ["en", "fr"] as const
const schema = z.object({
  defaultLanguage: z.enum(languages).default("en"),
  languages: z.array(z.enum(languages)),
  flagUrl: z.function().args(z.string()).returns(z.string()),
  flags: z.record(z.enum(languages), z.string()),
  languagesLabel: z.record(z.enum(languages), z.string()),
})

export type Locale = z.infer<typeof schema>["defaultLanguage"]
const config = schema.parse({
  defaultLanguage: "en",
  languages,
  flagUrl: (lang: string) => `https://flagsapi.com/${lang}/flat/64.png`,
  flags: {
    en: "US",
    fr: "FR",
  },
  languagesLabel: {
    en: "English",
    fr: "Français",
  },
})

export default config
