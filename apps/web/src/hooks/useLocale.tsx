import { useCallback, useEffect } from "react"

import type { Locale } from "@my-wishlist/config"

import useLocaleStore from "@/stores/locale"
import changeLanguage from "@/utils/locale/changeLocale"
import getLocale from "@/utils/locale/getLocale"
import getTranslations from "@/utils/locale/getTranslations"
import translationInterpolator from "@/utils/locale/translationInterpolator"

const useLocale = () => {
  const { setLocale, setTranslations, locale, ...localeStore } =
    useLocaleStore()
  const changeLocale = useCallback(
    async (newLocale: Locale) => {
      if (locale === newLocale) {
        return
      }

      setLocale(newLocale)
      const { t: _, ...translations } = await getTranslations(newLocale)
      setTranslations(translations)
    },
    [locale, setLocale, setTranslations],
  )
  const handleChangeLanguage = async (language: Locale) => {
    changeLanguage(language)
    await changeLocale(language)
  }

  useEffect(() => {
    void (async () => {
      const cookieLanguage = getLocale()
      await changeLocale(cookieLanguage)
    })()
  }, [changeLocale])

  return {
    setLocale,
    changeLocale,
    t: translationInterpolator,
    handleChangeLanguage,
    locale,
    ...localeStore,
  }
}
export default useLocale
