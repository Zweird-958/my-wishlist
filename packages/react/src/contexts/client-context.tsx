import { hc } from "hono/client"
import { type ReactNode, createContext, useContext, useMemo } from "react"

import type { AppType } from "@my-wishlist/api"
import { config } from "@my-wishlist/utils"

type Client = ReturnType<typeof hc<AppType>>["api"]

type Context = {
  client: Client
}

const ClientContext = createContext<Context>({} as Context)
export const useClient = () => useContext(ClientContext)

type Props = {
  token: string | null
  children: ReactNode
}

const getClient = (token: string | null) =>
  hc<AppType>(config.apiUrl.replace("/api", ""), {
    headers: { Authorization: token ?? "" },
  }).api

export const ClientProvider = ({ children, token }: Props) => {
  const client = useMemo(() => getClient(token), [token])

  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  )
}
