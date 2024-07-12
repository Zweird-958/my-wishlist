import { locale as osLocale } from "@tauri-apps/plugin-os"
import { Store } from "@tauri-apps/plugin-store"
import i18next from "i18next"
import ICU from "i18next-icu"
import resourcesToBackend from "i18next-resources-to-backend"
import { ReactNode, useCallback, useEffect, useMemo } from "react"
import { I18nextProvider as Provider, initReactI18next } from "react-i18next"

import { config as desktopConfig } from "@my-wishlist/config/desktop"

import config, { Locale, Namespace } from "./config"
import { languageSchemaFallback } from "./schemas"
import { getOptions } from "./settings"
import { useTranslation as useTranslationGeneric } from "./useTranslation"
import matchLocale from "./utils/matchLocale"

const store = new Store(desktopConfig.store.name)

const runsOnServerSide = typeof window === "undefined"

void i18next
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
    void i18next.changeLanguage(language)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Provider i18n={i18next}>{children}</Provider>
}

export const getLocale = async () =>
  languageSchemaFallback.parse(
    (await store.get(desktopConfig.store.localeKey)) ??
      matchLocale((await osLocale()) ?? ""),
  )

export const useTranslation = (...ns: Namespace[]) => {
  const { i18n, ...rest } = useTranslationGeneric(...ns)

  const changeLanguage = useCallback(
    async (newLocale: Locale) => {
      void i18n.changeLanguage(newLocale)
      await store.set(desktopConfig.store.localeKey, newLocale)
      await store.save()
    },
    [i18n],
  )

  useEffect(() => {
    void (async () => {
      void i18n.changeLanguage(await getLocale())
    })()
  }, [i18n])

  return {
    ...rest,
    changeLanguage,
  }
}

export type UseTranslation = ReturnType<typeof useTranslation>
