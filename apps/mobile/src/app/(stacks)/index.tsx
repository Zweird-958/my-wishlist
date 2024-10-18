import { useRouter } from "expo-router"
import { useState } from "react"

import { useWishlist } from "@/components/contexts/WishlistContext"
import AddFloatingButton from "@/components/ui/button/add-floating-button"
import DeleteWishModal from "@/components/wishlist/delete-wish-modal"
import WishList from "@/components/wishlist/wish-list"

const Index = () => {
  const { wishlist } = useWishlist()
  const router = useRouter()

  const handleAddWish = () => {
    router.push("/wish/create")
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <WishList wishlist={wishlist} setOpen={setOpen} isEditable />
      <DeleteWishModal open={open} setOpen={setOpen} />
      <AddFloatingButton onPress={handleAddWish} />
    </>
  )
}

export default Index
