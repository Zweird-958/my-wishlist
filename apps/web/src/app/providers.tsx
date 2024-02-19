"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

import client from "@my-wishlist/api"

import config from "@/utils/config"

type Props = {
  children: ReactNode
}

const Providers = (props: Props) => {
  const { children } = props

  client.onAuth((request) =>
    request.setHeaders({
      ...request.headers,
      Authorization: localStorage.getItem(config.localStorageSessionKey) ?? "",
    }),
  )

  return (
    <NextUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextUIProvider>
  )
}

export default Providers
