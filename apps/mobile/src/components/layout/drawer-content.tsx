import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"
import { type Href, usePathname, useRouter } from "expo-router"
import { useTranslation } from "react-i18next"

import { useSession } from "@/components/contexts/SessionContext"
import { useTheme } from "@/components/contexts/ThemeContext"
import { DRAWER_ITEMS, type FunctionName } from "@/utils/layout"

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { tw } = useTheme()
  const { t } = useTranslation()
  const { signOut } = useSession()

  const handleHrefOnPress = (href: Href<string>) => {
    if (pathname === href) {
      navigation.closeDrawer()

      return
    }

    router.replace(href)
    navigation.closeDrawer()
  }

  const handleFunctionOnPress = async (functionName: FunctionName) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (functionName !== "signOut") {
      return
    }

    await signOut()
    router.replace("/sign-in")
    navigation.closeDrawer()
  }

  return (
    <DrawerContentScrollView style={tw.style("bg-card")}>
      {DRAWER_ITEMS.map(({ label, href, name, functionName }) => (
        <DrawerItem
          key={name}
          label={t(`layout.drawer.${label}`)}
          onPress={() =>
            href ? handleHrefOnPress(href) : handleFunctionOnPress(functionName)
          }
          labelStyle={tw.style("text-card-foreground", {
            "text-primary": pathname === href,
          })}
        />
      ))}
    </DrawerContentScrollView>
  )
}

export default DrawerContent
