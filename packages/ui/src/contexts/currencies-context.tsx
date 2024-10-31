import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import type { Currency } from "@my-wishlist/types"

import useClient from "../hooks/use-client"
import { useQuery } from "../hooks/use-query"

type Context = {
  currencies: Currency[]
}

const CurrenciesContext = createContext<Context>({} as Context)
export const useCurrencies = () => useContext(CurrenciesContext)

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const client = useClient()

  const { data } = useQuery(() => client.currency.$get(), {
    queryKey: ["currency"],
    enabled: currencies.length === 0,
  })

  useEffect(() => {
    if (data) {
      setCurrencies(data.result)
    }
  }, [data])

  return (
    <CurrenciesContext.Provider value={{ currencies }}>
      {children}
    </CurrenciesContext.Provider>
  )
}
