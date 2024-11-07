import type { Locale } from "@my-wishlist/config/i18n"
import type { Currency } from "@my-wishlist/types"

const currencySymbols = {
  DOLLAR: "USD",
  EURO: "EUR",
  POUND: "GBP",
}

const formatCurrency = (price: number, currency: Currency, lang: Locale) =>
  new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currencySymbols[currency] || currencySymbols.DOLLAR,
  }).format(price)

export default formatCurrency
