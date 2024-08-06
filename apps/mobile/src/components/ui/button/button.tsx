import { forwardRef } from "react"
import { Pressable, type View } from "react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"

import useButton, {
  type UseButtonProps,
} from "@/components/ui/button/use-button"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type ButtonProps = UseButtonProps

const Button = forwardRef<View, ButtonProps>((props, ref) => {
  const { getGestureProps, getProps } = useButton({ ...props, ref })

  return (
    <GestureDetector {...getGestureProps()}>
      <AnimatedPressable {...getProps()} />
    </GestureDetector>
  )
})
Button.displayName = "Button"

export default Button
