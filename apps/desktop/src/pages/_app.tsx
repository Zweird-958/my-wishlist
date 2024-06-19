import { NextIntlClientProvider } from "next-intl"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

import "@/styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Europe/Paris"
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  )
}

export default App
