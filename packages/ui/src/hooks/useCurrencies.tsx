"use client"

import { useFetch } from "@hyper-fetch/react"

import { getCurrencies } from "@my-wishlist/api/routes/currencies"

import useCurrenciesStore from "../stores/currencies"

const useCurrencies = () => {
  const { currencies, setCurrencies } = useCurrenciesStore()
  const { loading, onSuccess } = useFetch(getCurrencies, {
    disabled: currencies.length > 0,
  })

  onSuccess(({ response: { result } }) => {
    setCurrencies(result)
  })

  return {
    currencies,
    setCurrencies,
    isLoading: loading,
  }
}

export default useCurrencies
