import type { ReactNode } from "react"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Text } from "@/components/ui/text"

type Props = {
  name: string
  children: ReactNode
}

const SectionItem = ({ name, children }: Props) => {
  const { tw } = useTheme()

  return (
    <View style={tw.style("justify-between flex-row items-center")}>
      <Text>{name}</Text>
      {children}
    </View>
  )
}

export default SectionItem
