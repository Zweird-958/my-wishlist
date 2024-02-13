"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Providers = (props: Props) => {
  const { children } = props

  return <NextUIProvider>{children}</NextUIProvider>
}

export default Providers
