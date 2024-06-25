import { locale as osLocale } from "@tauri-apps/plugin-os"
import { useCallback, useEffect } from "react"

import { Locale } from "@my-wishlist/i18n"
import { matchLocale } from "@my-wishlist/i18n/utils"
import { languageSchemaFallback } from "@my-wishlist/schemas"

import useTranslationStore from "@/stores/translation"
import config from "@/utils/config"
import store from "@/utils/store"

const useTranslation = () => {
  const { translation, setTranslation, locale, setLocale } =
    useTranslationStore()

  const changeLocale = useCallback(
    async (newLocale: Locale) => {
      const messages = await import(`../../locales/${newLocale}.json`)
      setTranslation(messages)
      setLocale(newLocale)

      await store.set(config.store.localeKey, newLocale)
      await store.save()
    },
    [setLocale, setTranslation],
  )

  useEffect(() => {
    ;(async () => {
      const storeLocale =
        (await store.get(config.store.localeKey)) ??
        matchLocale((await osLocale()) ?? "")

      changeLocale(languageSchemaFallback.parse(storeLocale))
    })()
  }, [changeLocale])

  return { locale, t: translation, changeLocale }
}

export default useTranslation
