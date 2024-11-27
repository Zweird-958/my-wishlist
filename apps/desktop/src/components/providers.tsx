import { useRouter } from "next/router"
import type { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n/desktop"
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

const queryClient = new QueryClient()

const DependentProviders = ({ children }: { children: ReactNode }) => {
  const { token } = useSession()

  return <ClientProvider token={token}>{children}</ClientProvider>
}

const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <AppProvider
        useTranslation={useTranslation}
        useSession={useSession}
        useRouter={useRouter}
      >
        <DependentProviders>
          <CurrenciesProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </CurrenciesProvider>
        </DependentProviders>
      </AppProvider>
    </SessionProvider>
  </QueryClientProvider>
)

export default Providers
