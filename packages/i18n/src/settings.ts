import config from "./config"

export const getOptions = (ns = config.defaultNamespace) => ({
  supportedLngs: config.languages,
  fallbackLng: config.defaultLanguage,
  fallbackNS: config.defaultNamespace,
  defaultNS: config.defaultNamespace,
  ns,
})
