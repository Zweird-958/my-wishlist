import { FlatList, View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlist } from "@/components/contexts/WishlistContext"
import WishCard from "@/components/wishlist/wish-card"

const Index = () => {
  const { tw } = useTheme()
  const { wishlist } = useWishlist()

  return (
    <FlatList
      data={wishlist}
      style={tw.style("px-6 pt-4")}
      renderItem={({ item: wish }) => <WishCard key={wish.id} wish={wish} />}
      ItemSeparatorComponent={() => <View style={tw.style("h-4")} />}
      ListFooterComponent={() => <View style={tw.style("h-12")} />}
    />
  )
}

export default Index
