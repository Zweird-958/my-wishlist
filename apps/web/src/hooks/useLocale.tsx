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

      await changeLanguage(newLocale)
      setLocale(newLocale)
      const { t: _, ...translations } = await getTranslations(newLocale)
      setTranslations(translations)
    },
    [locale, setLocale, setTranslations],
  )

  useEffect(() => {
    void (async () => {
      const cookieLanguage = getLocale()
      await changeLocale(cookieLanguage)
    })()
  }, [changeLocale])

  return {
    t: translationInterpolator,
    changeLocale,
    locale,
    ...localeStore,
  }
}
export default useLocale
