import { useFetch } from "@hyper-fetch/react"

import { getWishes } from "@my-wishlist/api/routes/wish"

import useSession from "@/hooks/useSession"
import useWishlistStore from "@/stores/wishlist"

const useWishlist = () => {
  const { session } = useSession()
  const {
    setWishlist,
    wishlist,
    selectedFilter,
    selectedSort,
    ...wishlistStore
  } = useWishlistStore()
  const { loading, onSuccess } = useFetch(getWishes, {
    disabled: wishlist.length > 0 || !session,
  })
  const wishlistFiltered = wishlist
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

      if (selectedSort === "priceDesc") {
        return wishB.price - wishA.price
      }

      return 0
    })

  onSuccess(({ response: { result } }) => {
    setWishlist(result)
  })

  return {
    setWishlist,
    wishlist,
    isLoading: loading,
    wishlistFiltered,
    selectedFilter,
    selectedSort,
    ...wishlistStore,
  }
}

export default useWishlist
