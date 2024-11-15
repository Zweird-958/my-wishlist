import { useRouter } from "next/router"
import type { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n/desktop"
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
        <CurrenciesProvider>
          <NextUIProvider>
            <ThemeProvider>
              <DependentProviders>{children}</DependentProviders>
            </ThemeProvider>
          </NextUIProvider>
        </CurrenciesProvider>
      </AppProvider>
    </SessionProvider>
  </QueryClientProvider>
)

export default Providers
