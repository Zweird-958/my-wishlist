import { useState } from "react"
import { FlatList, View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlist } from "@/components/contexts/WishlistContext"
import DeleteWishModal from "@/components/wishlist/delete-wish-modal"
import WishCard from "@/components/wishlist/wish-card"

const Index = () => {
  const { tw } = useTheme()
  const { wishlist } = useWishlist()

  const [open, setOpen] = useState(false)

  return (
    <>
      <FlatList
        data={wishlist}
        style={tw.style("px-6 pt-4")}
        renderItem={({ item: wish }) => (
          <WishCard key={wish.id} wish={wish} setOpen={setOpen} />
        )}
        ItemSeparatorComponent={() => <View style={tw.style("h-4")} />}
        ListFooterComponent={() => <View style={tw.style("h-12")} />}
      />
      <DeleteWishModal open={open} setOpen={setOpen} />
    </>
  )
}

export default Index
