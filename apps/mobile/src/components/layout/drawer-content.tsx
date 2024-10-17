import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"
import { type Href, usePathname, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/components/contexts/ThemeContext"
import { DRAWER_ITEMS } from "@/utils/layout"

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { tw } = useTheme()
  const { t } = useTranslation()

  const handleOnPress = (href: Href<string>) => {
    if (pathname === href) {
      navigation.closeDrawer()

      return
    }

    router.replace(href)
    navigation.closeDrawer()
  }

  return (
    <DrawerContentScrollView style={tw.style("bg-card")}>
      {DRAWER_ITEMS.map(({ label, href, name }) => (
        <DrawerItem
          key={name}
          label={t(`layout.drawer.${label}`)}
          onPress={() => handleOnPress(href)}
          labelStyle={tw.style("text-card-foreground", {
            "text-primary": pathname === href,
          })}
        />
      ))}
    </DrawerContentScrollView>
  )
}

export default DrawerContent
