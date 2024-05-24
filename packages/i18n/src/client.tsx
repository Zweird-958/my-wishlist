"use client"

import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import ICU from "i18next-icu"
import resourcesToBackend from "i18next-resources-to-backend"
import { useEffect, useState } from "react"
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next"

import config, { Locale } from "@my-wishlist/config"

import webConfig, { Namespace } from "./config"
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
      order: ["cookie", "localStorage", "navigator"],
      lookupCookie: webConfig.cookieLanguageKey,
      lookupLocalStorage: webConfig.localStorageLanguageKey,
    },

    preload: runsOnServerSide ? config.languages : [],
  })

export const useTranslation = (...ns: Namespace[]) => {
  const locale = localStorage.getItem(
    webConfig.localStorageLanguageKey,
  ) as Locale
  const ret = useTranslationOrg(ns)
  const { i18n } = ret
  const [activeLang, setActiveLang] = useState(i18n.resolvedLanguage)

  useEffect(() => {
    if (activeLang === i18n.resolvedLanguage) {
      return
    }

    setActiveLang(i18n.resolvedLanguage)
  }, [activeLang, i18n.resolvedLanguage])
  useEffect(() => {
    void i18n.changeLanguage(locale)
  }, [locale, i18n])

  if (runsOnServerSide && i18n.resolvedLanguage !== locale) {
    void i18n.changeLanguage(locale)
  }

  return { ...ret, locale }
}
