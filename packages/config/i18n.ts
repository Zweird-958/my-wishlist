import { z } from "zod"

export const languages = ["en", "fr"] as const
const schema = z.object({
  cookieLanguageKey: z.string(),
  defaultNamespace: z.enum(["common", "errors", "forms", "zodErrors"]),
  defaultLanguage: z.enum(languages).default("en"),
  languages: z.array(z.enum(languages)),
  flagUrl: z.function().args(z.string()).returns(z.string()),
  flags: z.record(z.enum(languages), z.string()),
  languagesLabel: z.record(z.enum(languages), z.string()),
})

export type Namespace = z.infer<typeof schema>["defaultNamespace"]
export type Locale = z.infer<typeof schema>["defaultLanguage"]

export const config = schema.parse({
  cookieLanguageKey: "my-wishlist-language",
  defaultNamespace: "common",
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
