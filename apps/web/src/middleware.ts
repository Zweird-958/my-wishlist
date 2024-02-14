import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { type NextRequest, NextResponse } from "next/server"

import languageConfig from "@my-wishlist/config"
import { languageSchema, languageSchemaFallback } from "@my-wishlist/schemas"

import webConfig from "@/utils/config"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}
export const middleware = (request: NextRequest) => {
  const { headers, cookies } = request
  const cookieLanguage = cookies.get(webConfig.cookieLanguageKey)?.value
  const lang = languageSchema
    .catch(() => {
      const languages = new Negotiator({
        headers: { "accept-language": headers.get("Accept-Language") ?? "" },
      }).languages()
      const locale = match(
        languages,
        languageConfig.languages,
        languageConfig.defaultLanguage,
      )

      return languageSchemaFallback.parse(locale)
    })
    .parse(cookies.get(webConfig.cookieLanguageKey)?.value)
  const response = NextResponse.next()

  if (cookieLanguage !== lang) {
    response.cookies.set(webConfig.cookieLanguageKey, lang)
  }

  return response
}
