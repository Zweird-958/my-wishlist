import { config } from "@my-wishlist/config/i18n"

export const getOptions = (ns = config.defaultNamespace) => ({
  supportedLngs: config.languages,
  fallbackLng: config.defaultLanguage,
  fallbackNS: config.defaultNamespace,
  defaultNS: config.defaultNamespace,
  ns,
})
