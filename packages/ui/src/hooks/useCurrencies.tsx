"use client"

import { useEffect } from "react"

import type { Currency } from "@my-wishlist/types"

import useCurrenciesStore from "../stores/currencies"
import useQuery from "./useQuery"

const useCurrencies = () => {
  const { currencies, setCurrencies } = useCurrenciesStore()
  const { data, isLoading } = useQuery<Currency[]>({
    method: "get",
    path: "/currency",
    enabled: currencies.length === 0,
    queryKey: ["currencies"],
  })

  useEffect(() => {
    if (data?.result && currencies.length === 0) {
      setCurrencies(data.result)
    }
  }, [currencies.length, data?.result, setCurrencies])

  return {
    currencies,
    setCurrencies,
    isLoading,
  }
}

export default useCurrencies
