import { create } from "zustand"

import config, { type Locale } from "@my-wishlist/config"

import common from "@/locales/en/common"
import errors from "@/locales/en/errors"
import forms from "@/locales/en/forms"
import zodErrors from "@/locales/en/zodErrors"

type LocaleStore = {
  locale: Locale
  setLocale: (locale: Locale) => void
  translations: typeof defaultTranslation
  setTranslations: (translations: typeof defaultTranslation) => void
}

const defaultTranslation = {
  common,
  forms,
  zodErrors,
  errors,
}
const useLocaleStore = create<LocaleStore>((set) => ({
  locale: config.defaultLanguage,
  setLocale: (locale: Locale) => set({ locale }),
  translations: defaultTranslation,
  setTranslations: (translations: typeof defaultTranslation) =>
    set({ translations }),
}))

export default useLocaleStore
