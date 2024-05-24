import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

import "./globals.css"
import Providers from "./providers"

type Props = {
  children: ReactNode
}

const Appbar = dynamic(() => import("./Appbar"), { ssr: false })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}
const RootLayout = (props: Props) => {
  const { children } = props

  return (
    <html lang="en">
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
  )
}

export default RootLayout
