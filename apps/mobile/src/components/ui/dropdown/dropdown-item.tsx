import { type ComponentPropsWithoutRef, forwardRef } from "react"
import type {
  GestureResponderEvent,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import {
  type Item,
  useDropdownContext,
} from "@/components/ui/dropdown/dropdown-context"
import useDOMRef from "@/hooks/useDOMRef"

export type DropdownItemProps = {
  closeOnPress?: boolean
} & Item &
  Omit<ComponentPropsWithoutRef<typeof Button>, "isText" | "children">

const DropdownItem = forwardRef<View, DropdownItemProps>(
  (
    { onPress, color = "card", style, value, label, closeOnPress, ...props },
    ref,
  ) => {
    const { onChange, hideDropdown } = useDropdownContext()
    const domRef = useDOMRef(ref)
    const { tw } = useTheme()

    const handleOnPress = (event: GestureResponderEvent) => {
      onChange({ value, label })
      onPress?.(event)

      if (closeOnPress) {
        hideDropdown()
      }
    }

    return (
      <Button
        ref={domRef}
        onPress={handleOnPress}
        color={color}
        style={[tw.style("w-full flex-col"), style as StyleProp<ViewStyle>]}
        isText={typeof label === "string"}
        {...props}
      >
        {label}
      </Button>
    )
  },
)

export default DropdownItem
