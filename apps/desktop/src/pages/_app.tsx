import { NextUIProvider } from "@nextui-org/react"
import { locale as osLocale } from "@tauri-apps/plugin-os"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"

import client from "@my-wishlist/api"
import {
  I18nProvider,
  config as i18nConfig,
  useTranslation,
} from "@my-wishlist/i18n/desktop"
import { matchLocale } from "@my-wishlist/i18n/utils"
import { languageSchemaFallback } from "@my-wishlist/schemas"

import Appbar from "@/components/Appbar"
import "@/styles/globals.css"
import config from "@/utils/config"
import store from "@/utils/store"

const App = ({ Component, pageProps }: AppProps) => {
  client.onAuth(async (request) =>
    request.setHeaders({
      ...request.headers,
      Authorization: (await store.get(config.store.sessionKey)) ?? "",
    }),
  )

  const { changeLanguage } = useTranslation()
  const [locale, setLocale] = useState(i18nConfig.defaultLanguage)

  useEffect(() => {
    ;(async () => {
      const storeLocale = languageSchemaFallback.parse(
        (await store.get(config.store.localeKey)) ??
          matchLocale((await osLocale()) ?? ""),
      )

      changeLanguage(storeLocale)
      setLocale(storeLocale)
    })()
  }, [changeLanguage])

  return (
    <I18nProvider language={locale}>
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
    </I18nProvider>
  )
}

export default App
