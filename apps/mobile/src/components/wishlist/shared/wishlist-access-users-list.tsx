import type { ComponentProps } from "react"
import { useTranslation } from "react-i18next"

import { useWishlistAccessUsers } from "@/components/contexts/wishlist-access-users-context"
import UsersSharedList from "@/components/wishlist/shared/users-shared-list"

type Props = Required<
  Pick<ComponentProps<typeof UsersSharedList>, "onItemPressed">
>

const WishlistAccessUsersList = ({ onItemPressed }: Props) => {
  const { wishlistAccessUsers, isLoading } = useWishlistAccessUsers()
  const { t } = useTranslation()

  return (
    <UsersSharedList
      items={wishlistAccessUsers}
      isLoading={isLoading}
      type="shared"
      title={t("common.shared.with")}
      emptyText={t("common.shared.emptyWith")}
      onItemPressed={onItemPressed}
    />
  )
}

export default WishlistAccessUsersList
