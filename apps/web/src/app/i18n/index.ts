import { createInstance } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { cookies } from "next/headers"
import { initReactI18next } from "react-i18next/initReactI18next"

import { Locale } from "@my-wishlist/config"

import webConfig, { Namespace } from "@/utils/config"

import { getOptions } from "./settings"

const initI18next = async (lng: Locale, ns: Namespace) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns))

  return i18nInstance
}

export const useTranslation = async (
  ns: Namespace = webConfig.defaultNamespace,
) => {
  const lng = cookies().get(webConfig.cookieLanguageKey)?.value as Locale
  const i18nextInstance = await initI18next(lng, ns)

  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  }
}
