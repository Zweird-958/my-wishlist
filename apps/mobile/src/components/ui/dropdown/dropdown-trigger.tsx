import { type ComponentPropsWithoutRef, forwardRef } from "react"
import type { GestureResponderEvent, View } from "react-native"

import { Button } from "@/components/ui/button"
import { useDropdownContext } from "@/components/ui/dropdown/dropdown-context"
import useDOMRef from "@/hooks/useDOMRef"

export type DropdownTriggerProps = ComponentPropsWithoutRef<typeof Button>

const DropdownTrigger = forwardRef<View, DropdownTriggerProps>(
  ({ onPress, color = "card", ...props }, ref) => {
    const { setMeasure, toggleDropdown } = useDropdownContext()
    const domRef = useDOMRef(ref)

    const handleOnPress = (event: GestureResponderEvent) => {
      toggleDropdown()
      // eslint-disable-next-line max-params
      domRef.current?.measureInWindow((x, y, width, height) => {
        setMeasure({ x, y, width, height })
      })

      onPress?.(event)
    }

    return (
      <Button ref={domRef} onPress={handleOnPress} color={color} {...props} />
    )
  },
)

export default DropdownTrigger
