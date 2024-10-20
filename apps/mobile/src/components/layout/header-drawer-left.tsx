import { useDrawerStatus } from "@react-navigation/drawer"
import type { HeaderBackButtonProps } from "@react-navigation/elements"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import { ChevronLeft, Menu } from "lucide-react-native"
import { TouchableOpacity } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"

const HeaderDrawerLeft = ({ canGoBack }: HeaderBackButtonProps) => {
  const navigation = useNavigation()

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const handleBack = () => navigation.goBack()
  const { tw } = useTheme()
  const drawerIsOpen = useDrawerStatus() === "open"
  const canBack = canGoBack && !drawerIsOpen

  return (
    <TouchableOpacity
      onPress={canBack ? handleBack : openDrawer}
      style={tw.style("px-4")}
    >
      {canBack ? (
        <ChevronLeft size={24} color={tw.color("primary")} />
      ) : (
        <Menu size={24} color={tw.color("primary")} />
      )}
    </TouchableOpacity>
  )
}

export default HeaderDrawerLeft
