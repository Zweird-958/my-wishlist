"use client"

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

  onSuccess(({ response: { result } }) => {
    setWishlist(result)
  })

  return {
    setWishlist,
    wishlist,
    isLoading: loading,
    selectedFilter,
    selectedSort,
    ...wishlistStore,
  }
}

export default useWishlist
