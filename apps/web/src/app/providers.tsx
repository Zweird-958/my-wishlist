"use client"

import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

import { useTranslation } from "@my-wishlist/i18n"
import { AppProvider } from "@my-wishlist/ui/AppContext"

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
        <NextUIProvider navigate={router.push}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </AppProvider>
  )
}

export default Providers
