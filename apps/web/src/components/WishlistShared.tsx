"use client"

import { useParams } from "next/navigation"

import WishlistSharedGeneric from "@my-wishlist/ui/pages/WishlistShared"

const WishlistShared = () => {
  const { userId } = useParams<{ userId: string }>()

  return <WishlistSharedGeneric userId={userId} />
}

export default WishlistShared
