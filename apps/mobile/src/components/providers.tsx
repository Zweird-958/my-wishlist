import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

import { SessionProvider } from "@/components/contexts/SessionContext"
import { ThemeProvider } from "@/components/contexts/ThemeContext"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default Providers
