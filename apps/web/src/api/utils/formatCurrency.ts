import type { Currency } from "@my-wishlist/types"

const currencySymbols = {
  DOLLAR: "USD",
  EURO: "EUR",
  POUND: "GBP",
}

const formatCurrency = (price: number, currency: Currency) => {
  const locale = "fr"

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencySymbols[currency] || currencySymbols.DOLLAR,
  }).format(price)
}

export default formatCurrency
