import { locale as osLocale } from "@tauri-apps/plugin-os"
import { Store } from "@tauri-apps/plugin-store"
import i18next from "i18next"
import ICU from "i18next-icu"
import resourcesToBackend from "i18next-resources-to-backend"
import { ReactNode, useEffect, useMemo } from "react"
import { I18nextProvider as Provider, initReactI18next } from "react-i18next"

import { config as desktopConfig } from "@my-wishlist/config/desktop"
import { languageSchemaFallback } from "@my-wishlist/schemas"

import config, { Locale, Namespace } from "./config"
import { getOptions } from "./settings"
import { useTranslation as useTranslationGeneric } from "./useTranslation"
import matchLocale from "./utils/matchLocale"

const store = new Store(desktopConfig.store.name)

const runsOnServerSide = typeof window === "undefined"

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .use(ICU)
  .init({
    ...getOptions(),
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
    i18next.changeLanguage(language)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Provider i18n={i18next}>{children}</Provider>
}

export const getLocale = async () =>
  languageSchemaFallback.parse(
    (await store.get(desktopConfig.store.sessionKey)) ??
      matchLocale((await osLocale()) ?? ""),
  )

export const useTranslation = (...ns: Namespace[]) => {
  const { changeLanguage, ...rest } = useTranslationGeneric(...ns)

  useEffect(() => {
    ;(async () => {
      changeLanguage(await getLocale())
    })()
  }, [changeLanguage])

  return {
    changeLanguage,
    ...rest,
  }
}
