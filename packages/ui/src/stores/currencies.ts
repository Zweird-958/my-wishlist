import { create } from "zustand"

import { Currency } from "@my-wishlist/types/Wish"

type CurrencyStore = {
  currencies: Currency[]
  setCurrencies: (currencies: Currency[]) => void
}

const useCurrencyStore = create<CurrencyStore>((set) => ({
  currencies: [],
  setCurrencies: (currencies: Currency[]) => set({ currencies }),
}))

export default useCurrencyStore
