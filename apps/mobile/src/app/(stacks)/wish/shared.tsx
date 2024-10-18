import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { UsersWishlistSharedProvider } from "@/components/contexts/users-wishlist-shared-context"
import { WishlistAccessUsersProvider } from "@/components/contexts/wishlist-access-users-context"
import WishlistAccessUsers from "@/components/wishlist/shared/wishlist-access-users"
import UsersWishlistSharedList from "@/components/wishlist/users-wishlist-shared-list"

const SharedPages = () => {
  const { tw } = useTheme()

  return (
    <UsersWishlistSharedProvider>
      <WishlistAccessUsersProvider>
        <View style={tw.style("py-4 gap-8 grow")}>
          <UsersWishlistSharedList />
          <WishlistAccessUsers />
        </View>
      </WishlistAccessUsersProvider>
    </UsersWishlistSharedProvider>
  )
}

export default SharedPages
