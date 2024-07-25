import type { Wish } from "@prisma/client"

import formatCurrency from "@/api/utils/formatCurrency"

const formatWish = (wish: Wish) => ({
  ...wish,
  priceFormatted: formatCurrency(wish.price, wish.currency),
})

export default formatWish
