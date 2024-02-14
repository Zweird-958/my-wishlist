import { getCookie } from "cookies-next"

import { languageSchemaFallback } from "@my-wishlist/schemas"

import config from "@/utils/config"

const getLocale = () => {
  const language = getCookie(config.cookieLanguageKey)

  return languageSchemaFallback.parse(language)
}

export default getLocale
