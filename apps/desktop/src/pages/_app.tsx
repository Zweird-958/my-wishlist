import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"

import client from "@my-wishlist/api"
import {
  I18nProvider,
  getLocale,
  config as i18nConfig,
} from "@my-wishlist/i18n/desktop"
import { useTranslation } from "@my-wishlist/i18n/utils"
import Appbar from "@my-wishlist/ui/Appbar"

import Providers from "@/components/providers"
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
      const storeLocale = await getLocale()

      changeLanguage(storeLocale)
      setLocale(storeLocale)
    })()
  }, [changeLanguage])

  return (
    <I18nProvider language={locale}>
      <Providers>
        <Toaster
          toastOptions={{
            className: "toast",
          }}
        />
        <Appbar />
        <main className="flex grow px-4">
          <Component {...pageProps} />
        </main>
      </Providers>
    </I18nProvider>
  )
}

export default App
