import { forwardRef } from "react"
import { Pressable, type View } from "react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"

import useButton, {
  type UseButtonProps,
} from "@/components/ui/button/use-button"
import { Spinner } from "@/components/ui/spinner"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type ButtonProps = UseButtonProps

const Button = forwardRef<View, ButtonProps>((props, ref) => {
  const {
    isLoading,
    children,
    getGestureProps,
    getButtonProps,
    getSpinnerProps,
  } = useButton({
    ...props,
    ref,
  })

  return (
    <GestureDetector {...getGestureProps()}>
      <AnimatedPressable {...getButtonProps()}>
        <>
          {isLoading && <Spinner {...getSpinnerProps()} />}
          {children}
        </>
      </AnimatedPressable>
    </GestureDetector>
  )
})
Button.displayName = "Button"

export default Button
