import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { UsersWishlistSharedProvider } from "@/components/contexts/users-wishlist-shared-context"
import { Divider } from "@/components/ui/divider"
import { Text } from "@/components/ui/text"
import UsersWishlistSharedList from "@/components/wishlist/users-wishlist-shared-list"

const SharedPages = () => {
  const { tw } = useTheme()
  const { t } = useTranslation()

  return (
    <UsersWishlistSharedProvider>
      <View style={tw.style("py-4")}>
        <View style={tw.style("px-6 gap-2")}>
          <Text>{t("common.shared.withYou")}</Text>
          <Divider />
        </View>
        <UsersWishlistSharedList />
      </View>
    </UsersWishlistSharedProvider>
  )
}

export default SharedPages
