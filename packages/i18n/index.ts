import { useTranslation as useTranslationOrg } from "react-i18next"

import { languageSchemaFallback } from "@my-wishlist/schemas"

import config, { Locale, Namespace, languages } from "./src/config"

export const useTranslation = (...ns: Namespace[]) => {
  const { i18n, ...rest } = useTranslationOrg(ns)
  const changeLanguage = (locale: Locale) => i18n.changeLanguage(locale)

  return {
    i18n,
    locale: languageSchemaFallback.parse(i18n.resolvedLanguage),
    changeLanguage,
    ...rest,
  }
}

export { config, languages, type Locale, type Namespace }
