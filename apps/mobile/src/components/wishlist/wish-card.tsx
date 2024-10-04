import { Image, ImageBackground } from "expo-image"
import { useTranslation } from "react-i18next"
import { Linking, View } from "react-native"

import type { Wish } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Card, CardBody, CardFooter } from "@/components/ui/card"
import { Text } from "@/components/ui/text"

type Props = {
  wish: Wish
}

const WishCard = ({ wish }: Props) => {
  const { image, name, link, priceFormatted } = wish
  const { tw } = useTheme()
  const { t } = useTranslation()

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
