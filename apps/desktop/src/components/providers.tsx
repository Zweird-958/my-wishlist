import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n/desktop"
import { AppProvider } from "@my-wishlist/ui/AppContext"

import useSession from "@/hooks/useSession"

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => (
  <AppProvider
    useTranslation={useTranslation}
    useSession={useSession}
    useRouter={useRouter}
  >
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </AppProvider>
)

export default Providers
