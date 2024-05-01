import { useFetch } from "@hyper-fetch/react"

import { getWishes } from "@my-wishlist/api/routes/wish"

import useSession from "@/hooks/useSession"
import useWishlistStore from "@/stores/wishlist"
import filterWishlist from "@/utils/filterWishlist"

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
  const wishlistFiltered = filterWishlist(
    wishlist,
    selectedFilter,
    selectedSort,
  )

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
