import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default Providers
