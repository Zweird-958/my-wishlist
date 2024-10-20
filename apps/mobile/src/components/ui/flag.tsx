import { Image } from "expo-image"

import { config } from "@my-wishlist/config/i18n"

import { useTheme } from "@/components/contexts/ThemeContext"

type Props = {
  language: string
}

const Flag = ({ language }: Props) => {
  const { tw } = useTheme()

  return (
    <Image
      source={{ uri: config.flagUrl(language) }}
      alt={language}
      style={tw.style("size-6")}
    />
  )
}

export default Flag
