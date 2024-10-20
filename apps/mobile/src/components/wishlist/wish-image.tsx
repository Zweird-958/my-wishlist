import { Image, ImageBackground, type ImageProps } from "expo-image"

import { useTheme } from "@/components/contexts/ThemeContext"

type Props = { image: ImageProps["source"] }

const WishImage = ({ image }: Props) => {
  const { tw } = useTheme()

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

export default WishImage
