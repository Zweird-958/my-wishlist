import { Link } from "expo-router"
import { ChevronRight } from "lucide-react-native"
import { FlatList, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useUsersWishlistShared } from "@/components/contexts/users-wishlist-shared-context"
import CenteredSpinner from "@/components/ui/spinner/centered-spinner"
import { Text } from "@/components/ui/text"

const UsersWishlistSharedList = () => {
  const { usersWishlistShared, isLoading } = useUsersWishlistShared()
  const { tw } = useTheme()

  return (
    <FlatList
      data={usersWishlistShared}
      style={tw.style("px-6 pt-4 grow")}
      renderItem={({ item: user }) => (
        <Link href={`/wish/shared/${user.id}`} asChild>
          <TouchableOpacity style={tw.style("flex-row justify-between")}>
            <Text>{user.username}</Text>
            <ChevronRight size={24} color={tw.color("foreground")} />
          </TouchableOpacity>
        </Link>
      )}
      ListEmptyComponent={isLoading ? <CenteredSpinner /> : <Text>Empty</Text>}
      ItemSeparatorComponent={() => <View style={tw.style("h-4")} />}
    />
  )
}

export default UsersWishlistSharedList
