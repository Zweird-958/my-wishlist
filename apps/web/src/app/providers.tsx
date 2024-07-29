"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n"
import {
  AppProvider,
  NextUIProvider,
  QueryClient,
  QueryClientProvider,
  ThemeProvider,
} from "@my-wishlist/ui/providers"

import {
  SessionProvider,
  useSession,
} from "@/components/contexts/SessionContext"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers = (props: Props) => {
  const { children } = props
  const router = useRouter()

  return (
    <SessionProvider>
      <AppProvider
        useTranslation={useTranslation}
        useSession={useSession}
        useRouter={useRouter}
      >
        <QueryClientProvider client={queryClient}>
          <NextUIProvider navigate={(path) => router.push(path)}>
            <ThemeProvider>{children}</ThemeProvider>
          </NextUIProvider>
        </QueryClientProvider>
      </AppProvider>
    </SessionProvider>
  )
}

export default Providers
