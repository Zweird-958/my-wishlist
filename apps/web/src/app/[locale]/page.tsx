"use client"

import WishList from "@my-wishlist/ui/wish/WishList"

import AuthWishlist from "@/components/user/AuthWishlist"
import WishlistEmpty from "@/components/wishlist/WishlistEmpty"
import useSession from "@/hooks/useSession"
import useWishlist from "@/hooks/useWishlist"

const Home = () => {
  const { wishlist } = useWishlist()
  const { session } = useSession()

  if (!session) {
    return <AuthWishlist />
  }

  if (wishlist.length === 0) {
    return <WishlistEmpty />
  }

  return <WishList wishes={wishlist} />
}

export default Home
