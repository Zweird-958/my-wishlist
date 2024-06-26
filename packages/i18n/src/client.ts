"use client"

import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import ICU from "i18next-icu"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next"

import config from "./config"
import { getOptions } from "./settings"

const runsOnServerSide = typeof window === "undefined"

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .use(ICU)
  .init({
    ...getOptions(),
    detection: {
      caches: ["cookie"],
      lookupCookie: config.cookieLanguageKey,
    },
    preload: runsOnServerSide ? config.languages : [],
  })
