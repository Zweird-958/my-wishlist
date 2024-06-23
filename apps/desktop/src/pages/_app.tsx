import { NextUIProvider } from "@nextui-org/react"
import { getCookie } from "cookies-next"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"
import type { AppContext, AppProps } from "next/app"
import { Toaster } from "react-hot-toast"

import type { Locale } from "@my-wishlist/i18n"
import { parseLocale } from "@my-wishlist/i18n/utils"

import Appbar from "@/components/Appbar"
import "@/styles/globals.css"
import config from "@/utils/config"

import en from "../../locales/en.json"

type CustomAppProps = {
  locale: Locale
  messages: typeof en
}

const App = ({
  Component,
  pageProps,
  locale,
  messages,
}: AppProps & CustomAppProps) => (
  <NextIntlClientProvider
    locale={locale}
    messages={messages}
    timeZone="Europe/Paris"
  >
    <NextUIProvider>
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      <ThemeProvider>
        <Appbar />
        <main className="flex grow px-4">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </NextUIProvider>
  </NextIntlClientProvider>
)

App.getInitialProps = async ({
  ctx: { req },
}: AppContext): Promise<CustomAppProps> => {
  const headers = req?.headers
  const languageCookie = `${config.languageCookieKey}=`
  const locale = parseLocale({
    acceptLanguage: headers?.["accept-language"],
    cookieLanguage:
      getCookie(config.languageCookieKey) ??
      headers?.cookie
        ?.split(";")
        .find((cookie) => cookie.trim().startsWith(languageCookie))
        ?.replace(languageCookie, "")
        .trim(),
  })

  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    locale,
    messages,
  }
}

export default App
