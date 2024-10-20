import { useQuery } from "@tanstack/react-query"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import type { Currency } from "@my-wishlist/types"

import api from "@/utils/api"

type Context = {
  currencies: Currency[]
}

export const CurrenciesContext = createContext<Context>({} as Context)
export const useCurrencies = () => useContext(CurrenciesContext)

export const CurrenciesProvider = ({ children }: { children: ReactNode }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([])

  const { data } = useQuery({
    queryKey: ["currency"],
    queryFn: () => api.get<Currency[]>("/currency"),
    enabled: currencies.length === 0,
    select: ({ result }) => result,
  })

  useEffect(() => {
    if (data) {
      setCurrencies(data)
    }
  }, [data])

  return (
    <CurrenciesContext.Provider value={{ currencies }}>
      {children}
    </CurrenciesContext.Provider>
  )
}
