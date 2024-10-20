import { match } from "@formatjs/intl-localematcher"

import { config } from "@my-wishlist/config/i18n"

const matchLocale = (locale: string | string[]) =>
  match([locale].flat(), config.languages, config.defaultLanguage)

export default matchLocale
