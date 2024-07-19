"use client"

import { useRouter } from "next/navigation"
import { ReactNode } from "react"

import {
  NextUIProvider,
  QueryClient,
  QueryClientProvider,
  ThemeProvider,
} from "@my-wishlist/ui/providers"

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers = (props: Props) => {
  const { children } = props
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={(path) => router.push(path)}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default Providers
