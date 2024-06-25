import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"

import Appbar from "@/components/Appbar"
import "@/styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => (
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
)

export default App
