import Negotiator from "negotiator"

import { languageSchema, languageSchemaFallback } from "@my-wishlist/schemas"

import matchLocale from "./matchLocale"

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

      return languageSchemaFallback.parse(matchLocale(languages))
    })
    .parse(cookieLanguage)

export default parseLocale
