import { useFetch } from "@hyper-fetch/react"
import { useEffect } from "react"

import { getWishes } from "@my-wishlist/api/routes/wish"

import useSession from "@/hooks/useSession"
import useWishlistStore from "@/stores/wishlist"

const useWishlist = () => {
  const { session } = useSession()
  const { setWishlist, wishlist, ...wishlistStore } = useWishlistStore()
  const { data } = useFetch(getWishes, { disabled: wishlist.length > 0 })

  useEffect(() => {
    if (!session) {
      setWishlist([])

      return
    }

    if (data?.result) {
      setWishlist(data?.result || [])
    }
  }, [data?.result, setWishlist, session])

  return { setWishlist, wishlist, ...wishlistStore }
}

export default useWishlist
