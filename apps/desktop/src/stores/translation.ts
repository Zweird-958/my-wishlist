import { create } from "zustand"

import { Locale, config } from "@my-wishlist/i18n"

import en from "../../locales/en.json"

type TranslationStore = {
  translation: typeof en
  setTranslation: (translation: typeof en) => void
  locale: Locale
  setLocale: (locale: Locale) => void
}
const useTranslationStore = create<TranslationStore>((set) => ({
  translation: en,
  setTranslation: (translation) => set({ translation }),
  locale: config.defaultLanguage,
  setLocale: (locale) => set({ locale }),
}))

export default useTranslationStore
