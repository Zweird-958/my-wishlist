import { useRouter } from "next/router"
import type { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n/desktop"
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

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <AppProvider
      useTranslation={useTranslation}
      useSession={useSession}
      useRouter={useRouter}
    >
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </AppProvider>
  </SessionProvider>
)

export default Providers
