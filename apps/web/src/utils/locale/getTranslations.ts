import type { Locale } from "@my-wishlist/config"

import type common from "@/locales/en/common"
import type errors from "@/locales/en/errors"
import type forms from "@/locales/en/forms"
import type zodErrors from "@/locales/en/zodErrors"
import translationInterpolator from "@/utils/locale/translationInterpolator"

type Key = "common" | "forms" | "zodErrors" | "errors"

const getLocales = async <T>(key: Key, locale: Locale) => {
  const translations = await import(`@/locales/${locale}/${key}`)

  return translations.default as T
}
const getTranslations = async (locale: Locale) => ({
  common: await getLocales<typeof common>("common", locale),
  forms: await getLocales<typeof forms>("forms", locale),
  zodErrors: await getLocales<typeof zodErrors>("zodErrors", locale),
  errors: await getLocales<typeof errors>("errors", locale),
  t: translationInterpolator,
})

export default getTranslations
