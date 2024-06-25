import { match } from "@formatjs/intl-localematcher"

import config from "../config"

const matchLocale = (locale: string | string[]) =>
  match([locale].flat(), config.languages, config.defaultLanguage)

export default matchLocale
