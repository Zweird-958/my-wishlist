"use client"

import { Button } from "@nextui-org/react"

import WishList from "@my-wishlist/ui/wish/WishList"

import AuthWishlist from "@/components/user/AuthWishlist"
import useSession from "@/hooks/useSession"
import useWishlist from "@/hooks/useWishlist"

const Home = () => {
  const { wishlist } = useWishlist()
  const { session } = useSession()

  if (!session) {
    return <AuthWishlist />
  }

  if (!wishlist) {
    return <Button>nothin</Button>
  }

  return <WishList wishes={wishlist} />
}

export default Home
