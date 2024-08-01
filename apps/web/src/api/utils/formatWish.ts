import type { Wish } from "@prisma/client"

import type { Locale } from "@my-wishlist/i18n"

import formatCurrency from "@/api/utils/formatCurrency"

const formatWish = (wish: Wish, lang: Locale) => ({
  ...wish,
  priceFormatted: formatCurrency(wish.price, wish.currency, lang),
})

export default formatWish
