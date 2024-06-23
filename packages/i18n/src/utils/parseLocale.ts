import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

import { languageSchema, languageSchemaFallback } from "@my-wishlist/schemas"

import config from "../config"

const parseLocale = ({
  acceptLanguage,
  cookieLanguage,
}: {
  acceptLanguage?: string | null
  cookieLanguage?: string
}) =>
  languageSchema
    .catch(() => {
      const languages = new Negotiator({
        headers: { "accept-language": acceptLanguage ?? "" },
      }).languages()
      const languageMatch = match(
        languages,
        config.languages,
        config.defaultLanguage,
      )

      return languageSchemaFallback.parse(languageMatch)
    })
    .parse(cookieLanguage)

export default parseLocale
