import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

import { SessionProvider } from "@/components/contexts/SessionContext"
import { ThemeProvider } from "@/components/contexts/ThemeContext"
import { WishlistProvider } from "@/components/contexts/WishlistContext"
import { CurrenciesProvider } from "@/components/contexts/currencies-context"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SessionProvider>
        <WishlistProvider>
          <CurrenciesProvider>{children}</CurrenciesProvider>
        </WishlistProvider>
      </SessionProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default Providers
