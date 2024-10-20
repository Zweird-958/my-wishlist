import type { Wish } from "@prisma/client"

import type { Locale } from "@my-wishlist/i18n"

import config from "@/api/utils/config"
import formatCurrency from "@/api/utils/formatCurrency"

const formatWish = (wish: Wish, lang: Locale) => ({
  ...wish,
  image: `${config.upload.publicUrl}${wish.image}`,
  priceFormatted: formatCurrency(wish.price, wish.currency, lang),
})

export default formatWish
