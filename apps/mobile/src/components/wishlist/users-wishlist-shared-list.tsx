import { useTranslation } from "react-i18next"

import { useUsersWishlistShared } from "@/components/contexts/users-wishlist-shared-context"
import UsersSharedList from "@/components/wishlist/shared/users-shared-list"

const UsersWishlistSharedList = () => {
  const { usersWishlistShared, isLoading } = useUsersWishlistShared()
  const { t } = useTranslation()

  return (
    <UsersSharedList
      items={usersWishlistShared}
      isLoading={isLoading}
      type="sharedWith"
      title={t("common.shared.withYou")}
      emptyText={t("common.shared.emptyWithYou")}
    />
  )
}

export default UsersWishlistSharedList
