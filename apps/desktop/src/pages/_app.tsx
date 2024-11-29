import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"

import {
  I18nProvider,
  getLocale,
  config as i18nConfig,
  useTranslation,
} from "@my-wishlist/i18n/desktop"
import Appbar from "@my-wishlist/ui/appbar"
import "@my-wishlist/ui/globals.css"

import Providers from "@/components/providers"

const App = ({ Component, pageProps }: AppProps) => {
  const { changeLanguage } = useTranslation()
  const [locale, setLocale] = useState(i18nConfig.defaultLanguage)

  useEffect(() => {
    void (async () => {
      const storeLocale = await getLocale()

      void changeLanguage(storeLocale)
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
