"use client"

import { Button } from "@nextui-org/react"

import WishList from "@my-wishlist/ui/wish/WishList"

import useWishlist from "@/hooks/useWishlist"

const Home = () => {
  const { wishlist } = useWishlist()

  if (!wishlist) {
    return <Button>nothin</Button>
  }

  return <WishList wishes={wishlist} />
}

export default Home
