import { Image, ImageBackground } from "expo-image"
import { Trash2 } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { Linking, View } from "react-native"

import type { Wish } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlist } from "@/components/contexts/WishlistContext"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card"
import { Text } from "@/components/ui/text"

type Props = {
  wish: Wish
  setOpen: (open: boolean) => void
}

const WishCard = ({ wish, setOpen }: Props) => {
  const { image, name, link, priceFormatted } = wish
  const { tw } = useTheme()
  const { t } = useTranslation()
  const { selectWish } = useWishlist()

  const handleShowModal = () => {
    setOpen(true)
    selectWish(wish.id)
  }

  const handleBuy = async () => {
    if (!link) {
      return
    }

    const canOpen = await Linking.canOpenURL(link)

    if (!canOpen) {
      return
    }

    await Linking.openURL(link)
  }

  return (
    <Card style={tw.style("h-[20rem]")} isFooterBlurred>
      <CardHeader style={tw.style("absolute top-0 z-10")}>
        <Button isIconOnly color="danger" onPress={handleShowModal}>
          <Trash2 size={16} color={tw.color("danger-foreground")} />
        </Button>
      </CardHeader>
      <CardBody style={tw.style("p-0")}>
        <ImageBackground
          source={image}
          style={tw.style("w-full h-full")}
          imageStyle={tw.style("rounded-md")}
          blurRadius={5}
        >
          <Image
            source={image}
            contentFit="contain"
            style={tw.style("w-full h-full")}
          />
        </ImageBackground>
      </CardBody>

      <CardFooter
        style={tw.style("absolute bottom-0 z-20 bg-card/20")}
        styles={{
          blur: tw.style("flex-col gap-2"),
        }}
      >
        <View style={tw.style("flex-row gap-2 justify-between")}>
          <Text numberOfLines={1} style={tw.style("flex-shrink")}>
            {name}
          </Text>
          <Text>{priceFormatted}</Text>
        </View>
        <Button color="primary" isText onPress={handleBuy}>
          {t("common.buy")}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default WishCard
