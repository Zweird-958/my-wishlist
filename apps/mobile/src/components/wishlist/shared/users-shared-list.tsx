import { Link } from "expo-router"
import { ChevronRight, Trash2 } from "lucide-react-native"
import { FlatList, View } from "react-native"

import type { UserShared } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Divider } from "@/components/ui/divider"
import CenteredSpinner from "@/components/ui/spinner/centered-spinner"
import { Text } from "@/components/ui/text"
import UsersSharedItem from "@/components/wishlist/shared/users-shared-item"

type Props = {
  items: UserShared[]
  isLoading: boolean
  title: string
  emptyText: string
  type: "shared" | "sharedWith"
}

const UsersSharedList = ({
  items,
  isLoading,
  type,
  title,
  emptyText,
}: Props) => {
  const { tw } = useTheme()

  return (
    <View style={tw.style("gap-4 max-h-2/5")}>
      <View style={tw.style("px-6 gap-2")}>
        <Text>{title}</Text>
        <Divider />
      </View>
      <FlatList
        data={items}
        style={tw.style("px-6 grow")}
        renderItem={({ item: user }) =>
          type === "shared" ? (
            <UsersSharedItem user={user} icon={Trash2} />
          ) : (
            <Link href={`/wish/shared/${user.id}`} asChild>
              <UsersSharedItem user={user} icon={ChevronRight} />
            </Link>
          )
        }
        ListEmptyComponent={
          isLoading ? <CenteredSpinner /> : <Text>{emptyText}</Text>
        }
        ItemSeparatorComponent={() => <View style={tw.style("h-4")} />}
      />
    </View>
  )
}

export default UsersSharedList
