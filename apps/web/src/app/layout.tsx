import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

import "./globals.css"
import Providers from "./providers"

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}
const RootLayout = (props: Props) => {
  const { children } = props

  return (
    <html>
      <body>
        <Toaster
          toastOptions={{
            className: "toast",
          }}
        />
        <Providers>
          <main className="flex grow px-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
