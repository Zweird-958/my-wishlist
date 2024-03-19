import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { type NextRequest, NextResponse } from "next/server"

import sharedConfig from "@my-wishlist/config"
import { languageSchema, languageSchemaFallback } from "@my-wishlist/schemas"

import webConfig from "@/utils/config"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}
const getLocale = ({ headers, cookies }: NextRequest) =>
  languageSchema
    .catch(() => {
      const languages = new Negotiator({
        headers: { "accept-language": headers.get("Accept-Language") ?? "" },
      }).languages()
      const languageMatch = match(
        languages,
        sharedConfig.languages,
        sharedConfig.defaultLanguage,
      )

      return languageSchemaFallback.parse(languageMatch)
    })
    .parse(cookies.get(webConfig.cookieLanguageKey)?.value)
export const middleware = (request: NextRequest) => {
  const response = NextResponse.next()
  const language = getLocale(request)
  const languageCookie = response.cookies.get(
    webConfig.cookieLanguageKey,
  )?.value

  if (language !== languageCookie) {
    response.cookies.set(webConfig.cookieLanguageKey, language)
  }

  return response
}
