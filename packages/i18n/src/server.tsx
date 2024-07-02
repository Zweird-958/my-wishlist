import { createInstance } from "i18next"
import ICU from "i18next-icu"
import resourcesToBackend from "i18next-resources-to-backend"
import { cookies as getCookies, headers as getHeaders } from "next/headers"
import { initReactI18next } from "react-i18next/initReactI18next"

import config, { Locale, Namespace } from "./config"
import { getOptions } from "./settings"
import parseLocale from "./utils/parseLocale"

const initI18next = async (lng: Locale, ns: Namespace) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .use(ICU)
    .init({ ...getOptions(ns), lng })

  return i18nInstance
}

export const getLocale = () => {
  const headers = getHeaders()
  const cookies = getCookies()

  return parseLocale({
    acceptLanguage: headers.get("Accept-Language"),
    cookieLanguage: cookies.get(config.cookieLanguageKey)?.value,
  })
}

export const useTranslation = async (
  ns: Namespace = config.defaultNamespace,
) => {
  const locale = getLocale()
  const i18nextInstance = await initI18next(locale, ns)

  return {
    t: i18nextInstance.getFixedT(locale, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  }
}
