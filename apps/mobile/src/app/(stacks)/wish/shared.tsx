import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

import type { UserShared } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import { UsersWishlistSharedProvider } from "@/components/contexts/users-wishlist-shared-context"
import UsersSharedList from "@/components/wishlist/shared/users-shared-list"
import UsersWishlistSharedList from "@/components/wishlist/users-wishlist-shared-list"
import api from "@/utils/api"

const SharedPages = () => {
  const { tw } = useTheme()
  const { t } = useTranslation()

  const { data: wishlistShared, isLoading: sharedLoading } = useQuery({
    queryFn: () => api.get<UserShared[]>("/share/wish"),
    queryKey: ["shared"],
  })

  return (
    <UsersWishlistSharedProvider>
      <View style={tw.style("py-4 gap-8 grow")}>
        <UsersWishlistSharedList />
        <UsersSharedList
          items={wishlistShared?.result ?? []}
          isLoading={sharedLoading}
          type="shared"
          title={t("common.shared.with")}
          emptyText={t("common.shared.emptyWith")}
        />
      </View>
    </UsersWishlistSharedProvider>
  )
}

export default SharedPages
