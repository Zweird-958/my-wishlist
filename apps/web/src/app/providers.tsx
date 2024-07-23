"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n"
import {
  AppProvider,
  NextUIProvider,
  QueryClient,
  QueryClientProvider,
  ThemeProvider,
} from "@my-wishlist/ui/providers"

import useSession from "@/hooks/useSession"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers = (props: Props) => {
  const { children } = props
  const router = useRouter()

  return (
    <AppProvider
      useTranslation={useTranslation}
      useSession={useSession}
      useRouter={useRouter}
    >
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={(path) => router.push(path)}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </AppProvider>
  )
}

export default Providers
