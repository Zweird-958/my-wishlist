import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Divider } from "@/components/ui/divider"
import { Text } from "@/components/ui/text"

type Props = {
  title: string
}

const SectionTitle = ({ title }: Props) => {
  const { tw } = useTheme()

  return (
    <View style={tw.style("flex-row")}>
      <View style={tw.style("w-auto gap-2")}>
        <Text style={tw.style("text-base")}>{title}</Text>
        <Divider color="card" />
      </View>
    </View>
  )
}

export default SectionTitle
