import { forwardRef } from "react"
import { View } from "react-native"

import useDivider, {
  type UseDividerProps,
} from "@/components/ui/divider/use-divider"

export type DividerProps = UseDividerProps

const Divider = forwardRef<View, DividerProps>((props, ref) => {
  const { getProps } = useDivider({
    ...props,
    ref,
  })

  return <View {...getProps()} />
})

Divider.displayName = "Divider"

export default Divider
