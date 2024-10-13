import { useRouter } from "expo-router"
import { Plus } from "lucide-react-native"
import { useState } from "react"
import { FlatList, View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlist } from "@/components/contexts/WishlistContext"
import { Button } from "@/components/ui/button"
import DeleteWishModal from "@/components/wishlist/delete-wish-modal"
import WishCard from "@/components/wishlist/wish-card"

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
      <FlatList
        data={wishlist}
        style={tw.style("px-6 pt-4 h-full")}
        renderItem={({ item: wish }) => (
          <WishCard key={wish.id} wish={wish} setOpen={setOpen} />
        )}
        ItemSeparatorComponent={() => <View style={tw.style("h-4")} />}
        ListFooterComponent={() => <View style={tw.style("h-12")} />}
      />
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
