import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n/desktop"
import { AppProvider } from "@my-wishlist/ui/AppContext"

import useSession from "@/hooks/useSession"

const Providers = ({ children }: { children: ReactNode }) => (
  <AppProvider
    useTranslation={useTranslation}
    useSession={useSession}
    useRouter={useRouter}
  >
    <NextUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextUIProvider>
  </AppProvider>
)

export default Providers
