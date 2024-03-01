import config from "@my-wishlist/config"

import webConfig from "@/utils/config"

export const getOptions = (
  lng = config.defaultLanguage,
  ns = webConfig.defaultNamespace,
) => ({
  supportedLngs: config.languages,
  fallbackLng: config.defaultLanguage,
  lng,
  fallbackNS: webConfig.defaultNamespace,
  defaultNS: webConfig.defaultNamespace,
  ns,
})
