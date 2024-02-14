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

export type Currency = "EURO" | "DOLLAR" | "POUND"
