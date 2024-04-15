import config from "@my-wishlist/config"

import webConfig from "@/utils/config"

export const getOptions = (ns = webConfig.defaultNamespace) => ({
  supportedLngs: config.languages,
  fallbackLng: config.defaultLanguage,
  fallbackNS: webConfig.defaultNamespace,
  defaultNS: webConfig.defaultNamespace,
  ns,
})
