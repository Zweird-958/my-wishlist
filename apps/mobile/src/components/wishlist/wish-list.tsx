import type { ComponentProps } from "react"
import { FlatList, View } from "react-native"

import type { Wish } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import CenteredSpinner from "@/components/ui/spinner/centered-spinner"
import WishCard from "@/components/wishlist/wish-card"

type Props = { wishlist: Wish[]; isLoading: boolean } & Omit<
  ComponentProps<typeof WishCard>,
  "wish"
>

const WishList = ({ wishlist, isEditable, isLoading, setOpen }: Props) => {
  const { tw } = useTheme()

  if (!isLoading) {
    return <CenteredSpinner size="lg" />
  }

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
