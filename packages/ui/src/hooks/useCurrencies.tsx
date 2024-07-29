"use client"

import { create } from "zustand"

import type { Currency } from "@my-wishlist/types"

type CurrencyStore = {
  currencies: Currency[]
  setCurrencies: (currencies: Currency[]) => void
}

const useCurrency = create<CurrencyStore>((set) => ({
  currencies: [],
  setCurrencies: (currencies: Currency[]) => set({ currencies }),
}))

export default useCurrency
