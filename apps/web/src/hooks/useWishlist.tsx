import { useFetch } from "@hyper-fetch/react"
import { useEffect } from "react"

import { getWishes } from "@my-wishlist/api/routes/wish"

import useWishlistStore from "@/stores/wishlist"

const useWishlist = () => {
  const { setWishlist, wishlist, ...wishlistStore } = useWishlistStore()
  const { data } = useFetch(getWishes, { disabled: wishlist.length > 0 })

  useEffect(() => {
    if (data?.result) {
      setWishlist(data?.result || [])
    }
  }, [data?.result, setWishlist])

  return { setWishlist, wishlist, ...wishlistStore }
}

export default useWishlist
