import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

import { I18nProvider } from "@my-wishlist/i18n"
import { getLocale, getTranslation } from "@my-wishlist/i18n/server"
import Appbar from "@my-wishlist/ui/Appbar"
import "@my-wishlist/ui/globals.css"

import Providers from "./providers"

type Props = {
  children: ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getTranslation()

  return {
    title: t("metadata.base.title"),
    description: t("metadata.base.description"),
  }
}

const RootLayout = (props: Props) => {
  const { children } = props
  const language = getLocale()

  return (
    <I18nProvider language={language}>
      <html lang={language}>
        <body>
          <Toaster
            toastOptions={{
              className: "toast",
            }}
          />
          <Providers>
            <Appbar />
            <main className="flex grow px-4">{children}</main>
          </Providers>
        </body>
      </html>
    </I18nProvider>
  )
}

export default RootLayout
