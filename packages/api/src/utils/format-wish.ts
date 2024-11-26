import type { Locale } from "@my-wishlist/config/i18n"

import type { WishTable } from "../types"
import config from "./config"
import formatCurrency from "./format-currency"

const formatWish = (wish: WishTable, lang: Locale) => ({
  ...wish,
  image: wish.image === null ? "" : `${config.upload.publicUrl}${wish.image}`,
  priceFormatted: formatCurrency(wish.price, wish.currency, lang),
})

export default formatWish
