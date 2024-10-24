import { BlurView } from "expo-blur"
import { Image, ImageBackground, type ImageProps } from "expo-image"
import { Platform, View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"

type Props = { image: ImageProps["source"] }

const WishImage = ({ image }: Props) => {
  const { tw } = useTheme()

  if (Platform.OS === "android") {
    return (
      <ImageBackground
        source={image}
        style={tw.style("w-full h-full")}
        imageStyle={tw.style("rounded-md")}
        blurRadius={5}
      >
        <Image
          source={image}
          contentFit="contain"
          style={tw.style("w-full h-full rounded-md")}
        />
      </ImageBackground>
    )
  }

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
