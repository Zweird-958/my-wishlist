import type { HeaderBackButtonProps } from "@react-navigation/elements"
import { useNavigation } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { TouchableOpacity } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"

const HeaderLeft = ({ canGoBack }: HeaderBackButtonProps) => {
  const navigation = useNavigation()

  const handleBack = () => navigation.goBack()
  const { tw } = useTheme()

  if (!canGoBack) {
    return null
  }

  return (
    <TouchableOpacity onPress={handleBack} style={tw.style("px-4")}>
      <ChevronLeft size={24} color={tw.color("primary")} />
    </TouchableOpacity>
  )
}

export default HeaderLeft
