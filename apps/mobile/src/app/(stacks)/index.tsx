import { useRouter } from "expo-router"
import { Plus } from "lucide-react-native"
import { useState } from "react"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlist } from "@/components/contexts/WishlistContext"
import { Button } from "@/components/ui/button"
import DeleteWishModal from "@/components/wishlist/delete-wish-modal"
import WishList from "@/components/wishlist/wish-list"

const Index = () => {
  const { tw } = useTheme()
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
      <Button
        style={tw.style("absolute bottom-8 right-6")}
        onPress={handleAddWish}
      >
        <Plus color={tw.color("primary-foreground")} />
      </Button>
    </>
  )
}

export default Index
