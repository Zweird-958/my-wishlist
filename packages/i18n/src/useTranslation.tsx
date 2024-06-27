"use client"

import { useCallback } from "react"
import { useTranslation as useTranslationOrg } from "react-i18next"

import { languageSchemaFallback } from "@my-wishlist/schemas"

import config, { Locale, Namespace } from "./config"

export const useTranslation = (...ns: Namespace[]) => {
  const { i18n, ...rest } = useTranslationOrg(
    ns.length > 0 ? ns : config.defaultNamespace,
  )
  const changeLanguage = useCallback(
    (locale: Locale) => i18n.changeLanguage(locale),
    [i18n],
  )

  return {
    i18n,
    locale: languageSchemaFallback.parse(i18n.resolvedLanguage),
    changeLanguage,
    ...rest,
  }
}
