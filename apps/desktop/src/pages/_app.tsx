import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"

import {
  I18nProvider,
  getLocale,
  config as i18nConfig,
  useTranslation,
} from "@my-wishlist/i18n/desktop"
import Appbar from "@my-wishlist/ui/Appbar"

import Providers from "@/components/providers"
import "@/styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
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
