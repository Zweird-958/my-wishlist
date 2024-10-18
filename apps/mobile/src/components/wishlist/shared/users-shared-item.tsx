import type { LucideIcon } from "lucide-react-native"
import { forwardRef } from "react"
import { TouchableOpacity, type TouchableOpacityProps } from "react-native"

import type { UserShared } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Text } from "@/components/ui/text"

type Props = {
  user: UserShared
  icon: LucideIcon
} & Omit<TouchableOpacityProps, "children" | "style">

const UsersSharedItem = forwardRef<TouchableOpacity, Props>(
  ({ user, icon: Icon, ...props }, ref) => {
    const { tw } = useTheme()

    return (
      <TouchableOpacity
        {...props}
        style={tw.style("flex-row justify-between")}
        ref={ref}
      >
        <Text>{user.username}</Text>
        <Icon size={20} color={tw.color("foreground")} />
      </TouchableOpacity>
    )
  },
)

export default UsersSharedItem
