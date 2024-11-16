"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n"
import { ClientProvider } from "@my-wishlist/react"
import {
  AppProvider,
  CurrenciesProvider,
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

const DependentProviders = ({ children }: { children: ReactNode }) => {
  const { token } = useSession()

  return <ClientProvider token={token}>{children}</ClientProvider>
}

const Providers = (props: Props) => {
  const { children } = props
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <DependentProviders>
          <AppProvider
            useTranslation={useTranslation}
            useSession={useSession}
            useRouter={useRouter}
          >
            <NextUIProvider navigate={(path) => router.push(path)}>
              <ThemeProvider>
                <CurrenciesProvider>{children}</CurrenciesProvider>
              </ThemeProvider>
            </NextUIProvider>
          </AppProvider>
        </DependentProviders>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
