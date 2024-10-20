"use client"

import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import ICU from "i18next-icu"
import resourcesToBackend from "i18next-resources-to-backend"
import { type ReactNode, useMemo } from "react"
import { I18nextProvider, initReactI18next } from "react-i18next"

import { type Locale, config } from "@my-wishlist/config/i18n"

import { getOptions } from "./settings"

const runsOnServerSide = typeof window === "undefined"

void i18next
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

export const I18nProvider = ({
  children,
  language,
}: {
  children: ReactNode
  language: Locale
}) => {
  useMemo(() => {
    void i18next.changeLanguage(language)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
