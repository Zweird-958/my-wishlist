import type { z } from "zod"

import type { currencySchema } from "@my-wishlist/schemas"

export type Wish = {
  id: number
  name: string
  image?: string
  link?: string
  price: number
  currency: Currency
  userId: number
  purchased: boolean
  createdAt: Date
  isPrivate: boolean
  priceFormatted: string
}

export type Currency = z.infer<typeof currencySchema>
