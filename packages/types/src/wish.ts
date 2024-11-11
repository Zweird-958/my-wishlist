import type { z } from "zod"

import { type wishes } from "@my-wishlist/db"
import type {
  addWishSchema,
  currencySchema,
  imageMobileSchema,
} from "@my-wishlist/schemas"

export type WishTable = typeof wishes.$inferSelect

export type Wish = {
  id: number
  name: string
  image?: string
  link?: string
  price: number
  currency: Currency
  userId: number
  createdAt: Date
  isPrivate: boolean
  priceFormatted: string
}

export type Currency = z.infer<typeof currencySchema>

export type AddWishSchema = z.infer<typeof addWishSchema>

export type UploadMobileImage = z.infer<typeof imageMobileSchema>
