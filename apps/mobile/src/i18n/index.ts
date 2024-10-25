import i18n from "i18next"
import ICU from "i18next-icu"
import { initReactI18next } from "react-i18next"

import { config } from "@my-wishlist/config/i18n"

import resources from "@/i18n/resources"

void i18n.use(initReactI18next).use(ICU).init({
  lng: config.defaultLanguage,
  fallbackLng: config.defaultLanguage,
  compatibilityJSON: "v3",
  resources,
})
