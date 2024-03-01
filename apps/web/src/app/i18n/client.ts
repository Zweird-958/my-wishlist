"use client"

import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import resourcesToBackend from "i18next-resources-to-backend"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next"

import config from "@my-wishlist/config"

import webConfig, { type Namespace } from "@/utils/config"
import getLocale from "@/utils/locale/getLocale"

import { getOptions } from "./settings"

const runsOnServerSide = typeof window === "undefined"

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? config.languages : [],
  })
export const useTranslation = (
  ns: Namespace = webConfig.defaultNamespace,
  options = {},
) => {
  const [cookies, setCookie] = useCookies([webConfig.cookieLanguageKey])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  const lng = getLocale()

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) {
        return
      }

      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) {
        return
      }

      i18n.changeLanguage(lng)
    }, [lng, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === lng) {
        return
      }

      setCookie(webConfig.cookieLanguageKey, lng, { path: "/" })
    }, [lng, cookies.i18next, setCookie])
  }

  return ret
}
