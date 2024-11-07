import type { Wish } from "@prisma/client"

import type { Locale } from "@my-wishlist/config/i18n"

import config from "./config"
import formatCurrency from "./format-currency"

const formatWish = (wish: Wish, lang: Locale) => ({
  ...wish,
  image: wish.image === null ? "" : `${config.upload.publicUrl}${wish.image}`,
  priceFormatted: formatCurrency(wish.price, wish.currency, lang),
})

export default formatWish
