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
  const {
    nextUrl: { pathname },
    url,
  } = request

  if (!sharedConfig.languages.some((lang) => pathname.startsWith(`/${lang}`))) {
    return NextResponse.redirect(
      new URL(`/${getLocale(request)}${pathname}`, url),
    )
  }

  const langInReferer = sharedConfig.languages.find((lang) =>
    pathname.startsWith(`/${lang}`),
  )
  const response = NextResponse.next()

  if (langInReferer) {
    response.cookies.set(webConfig.cookieLanguageKey, langInReferer)
  }

  return response
}
