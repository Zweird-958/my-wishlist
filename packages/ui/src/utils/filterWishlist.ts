import type { Filter, Sort } from "@my-wishlist/config"
import type { Wish } from "@my-wishlist/types"

const filterWishlist = (
  wishlist: Wish[],
  selectedFilter: Filter,
  selectedSort: Sort,
) =>
  wishlist
    .filter((wish) => {
      if (selectedFilter === "purchased") {
        return wish.purchased
      }

      if (selectedFilter === "notPurchased") {
        return !wish.purchased
      }

      return true
    })
    .sort((wishA, wishB) => {
      if (selectedSort === "date") {
        return (
          new Date(wishA.createdAt).getTime() -
          new Date(wishB.createdAt).getTime()
        )
      }

      if (selectedSort === "priceAsc") {
        return wishA.price - wishB.price
      }

      return wishB.price - wishA.price
    })

export default filterWishlist
