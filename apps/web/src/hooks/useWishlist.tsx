"use client"

import useWishlistGeneric from "@my-wishlist/ui/hooks/useWishlist"

import useSession from "@/hooks/useSession"

const useWishlist = () => {
  const { session } = useSession()

  return useWishlistGeneric(session)
}

export default useWishlist
