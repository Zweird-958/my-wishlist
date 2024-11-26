import type { ComponentProps, ReactNode } from "react"

import {
  ClientProvider,
  QueryClient,
  QueryClientProvider,
} from "@my-wishlist/react"

import {
  SessionProvider,
  useSession,
} from "@/components/contexts/SessionContext"
import { ThemeProvider } from "@/components/contexts/ThemeContext"
import { WishlistProvider } from "@/components/contexts/WishlistContext"
import { CurrenciesProvider } from "@/components/contexts/currencies-context"

type Props = {
  children: ReactNode
} & ComponentProps<typeof ThemeProvider>

const queryClient = new QueryClient()

const DependentProviders = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()

  return <ClientProvider token={session}>{children}</ClientProvider>
}

const Providers = ({ children, theme }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <DependentProviders>
          <WishlistProvider>
            <CurrenciesProvider>{children}</CurrenciesProvider>
          </WishlistProvider>
        </DependentProviders>
      </SessionProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default Providers
