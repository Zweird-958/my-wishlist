import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

import { config as i18nConfig } from "@my-wishlist/i18n"
import { languageSchemaFallback } from "@my-wishlist/schemas"

import config from "@/utils/config"

const useLocale = () => {
  const [locale, setLocale] = useState(i18nConfig.defaultLanguage)

  useEffect(() => {
    setLocale(languageSchemaFallback.parse(getCookie(config.languageCookieKey)))
  }, [])

  return locale
}

export default useLocale
