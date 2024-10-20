import { useState } from "react"

import type { UserShared } from "@my-wishlist/types"

import { useWishlistAccessUsers } from "@/components/contexts/wishlist-access-users-context"
import UnshareModal from "@/components/wishlist/shared/unshare-modal"
import WishlistAccessUsersList from "@/components/wishlist/shared/wishlist-access-users-list"

const WishlistAccessUsers = () => {
  const { setSelectedUser } = useWishlistAccessUsers()
  const [open, setOpen] = useState(false)

  const handleOnPress = (user: UserShared) => {
    setOpen(true)
    setSelectedUser(user)
  }

  return (
    <>
      <WishlistAccessUsersList onItemPressed={handleOnPress} />
      <UnshareModal open={open} setOpen={setOpen} />
    </>
  )
}

export default WishlistAccessUsers
