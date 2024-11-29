"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n"
import { ClientProvider } from "@my-wishlist/react"
import {
  AppProvider,
  CurrenciesProvider,
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

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <DependentProviders>
          <AppProvider
            useTranslation={useTranslation}
            useSession={useSession}
            useRouter={useRouter}
          >
            <ThemeProvider>
              <CurrenciesProvider>{children}</CurrenciesProvider>
            </ThemeProvider>
          </AppProvider>
        </DependentProviders>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
