import type { ComponentProps } from "react"
import { FlatList, View } from "react-native"

import type { Wish } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import WishCard from "@/components/wishlist/wish-card"

type Props = { wishlist: Wish[] } & Omit<
  ComponentProps<typeof WishCard>,
  "wish"
>

const WishList = ({ wishlist, isEditable, setOpen }: Props) => {
  const { tw } = useTheme()

  return (
    <FlatList
      data={wishlist}
      style={tw.style("px-6 pt-4 h-full")}
      renderItem={({ item: wish }) =>
        isEditable && setOpen ? (
          <WishCard
            key={wish.id}
            wish={wish}
            isEditable={isEditable}
            setOpen={setOpen}
          />
        ) : (
          <WishCard key={wish.id} wish={wish} />
        )
      }
      ItemSeparatorComponent={() => <View style={tw.style("h-4")} />}
      ListFooterComponent={() => <View style={tw.style("h-12")} />}
    />
  )
}

export default WishList
