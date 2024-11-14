import type { ComponentProps, ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "@my-wishlist/react"

import { SessionProvider } from "@/components/contexts/SessionContext"
import { ThemeProvider } from "@/components/contexts/ThemeContext"
import { WishlistProvider } from "@/components/contexts/WishlistContext"
import { CurrenciesProvider } from "@/components/contexts/currencies-context"

type Props = {
  children: ReactNode
} & ComponentProps<typeof ThemeProvider>

const queryClient = new QueryClient()

const Providers = ({ children, theme }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <WishlistProvider>
          <CurrenciesProvider>{children}</CurrenciesProvider>
        </WishlistProvider>
      </SessionProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default Providers
