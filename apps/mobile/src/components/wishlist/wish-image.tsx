import { BlurView } from "expo-blur"
import { Image, type ImageProps } from "expo-image"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"

type Props = { image: ImageProps["source"] }

const WishImage = ({ image }: Props) => {
  const { tw } = useTheme()

  return (
    <>
      <Image
        source={image}
        contentFit="cover"
        style={tw.style("w-full h-full rounded-md absolute")}
      />
      <View style={tw.style("h-full w-full rounded-md overflow-hidden")}>
        <BlurView intensity={30}>
          <Image
            source={image}
            contentFit="contain"
            style={tw.style("w-full h-full")}
          />
        </BlurView>
      </View>
    </>
  )
}

export default WishImage
