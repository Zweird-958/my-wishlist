import { useFetch } from "@hyper-fetch/react"
import { useEffect } from "react"

import { getWishes } from "@my-wishlist/api/routes/wish"

import useSession from "@/hooks/useSession"
import useWishlistStore from "@/stores/wishlist"

const useWishlist = () => {
  const { session } = useSession()
  const { setWishlist, wishlist, ...wishlistStore } = useWishlistStore()
  const { data } = useFetch(getWishes, {
    disabled: wishlist.length > 0 || !session,
  })

  useEffect(() => {
    if (wishlist.length === 0 && data && session) {
      setWishlist(data.result)
    }
  }, [setWishlist, session, wishlist.length, data])

  return { setWishlist, wishlist, ...wishlistStore }
}

export default useWishlist
