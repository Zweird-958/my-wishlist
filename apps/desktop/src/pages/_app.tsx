import { NextUIProvider } from "@nextui-org/react"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { Toaster } from "react-hot-toast"

import "@/styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Europe/Paris"
    >
      <NextUIProvider>
        <Toaster
          toastOptions={{
            className: "toast",
          }}
        />
        <ThemeProvider>
          <main className="flex grow px-4">
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </NextUIProvider>
    </NextIntlClientProvider>
  )
}

export default App
