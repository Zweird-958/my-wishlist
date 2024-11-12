import type { Locale } from "@my-wishlist/i18n"

import type { WishTable } from "@/api/types"
import config from "@/api/utils/config"
import formatCurrency from "@/api/utils/formatCurrency"

const formatWish = (wish: WishTable, lang: Locale) => ({
  ...wish,
  image: `${config.upload.publicUrl}${wish.image}`,
  priceFormatted: formatCurrency(wish.price, wish.currency, lang),
})

export default formatWish
