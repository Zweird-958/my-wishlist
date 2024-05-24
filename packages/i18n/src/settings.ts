import config from "@my-wishlist/config"

import i18nConfig from "./config"

export const getOptions = (ns = i18nConfig.defaultNamespace) => ({
  supportedLngs: config.languages,
  fallbackLng: config.defaultLanguage,
  fallbackNS: i18nConfig.defaultNamespace,
  defaultNS: i18nConfig.defaultNamespace,
  ns,
})
