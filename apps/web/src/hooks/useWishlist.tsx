import { useFetch } from "@hyper-fetch/react"

import { getWishes } from "@my-wishlist/api/routes/wish"

import useSession from "@/hooks/useSession"
import useWishlistStore from "@/stores/wishlist"

const useWishlist = () => {
  const { session } = useSession()
  const { setWishlist, wishlist, selectedFilter, ...wishlistStore } =
    useWishlistStore()
  const { loading, onSuccess } = useFetch(getWishes, {
    disabled: wishlist.length > 0 || !session,
  })
  const wishlistFiltered = wishlist.filter((wish) => {
    if (selectedFilter === "purchased") {
      return wish.purchased
    }

    if (selectedFilter === "notPurchased") {
      return !wish.purchased
    }

    return true
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
    ...wishlistStore,
  }
}

export default useWishlist
