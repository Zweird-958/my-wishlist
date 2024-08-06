import { forwardRef } from "react"
import { Pressable, type View } from "react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"

import useButton, {
  type UseButtonProps,
} from "@/components/ui/button/use-button"
import { Spinner } from "@/components/ui/spinner"
import { Text } from "@/components/ui/text"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type ButtonProps = UseButtonProps

const Button = forwardRef<View, ButtonProps>((props, ref) => {
  const {
    isLoading,
    children,
    isText,
    getGestureProps,
    getButtonProps,
    getSpinnerProps,
    getTextProps,
  } = useButton({
    ...props,
    ref,
  })

  return (
    <GestureDetector {...getGestureProps()}>
      <AnimatedPressable {...getButtonProps()}>
        <>
          {isLoading && <Spinner {...getSpinnerProps()} />}
          {isText ? <Text {...getTextProps()}>{children}</Text> : children}
        </>
      </AnimatedPressable>
    </GestureDetector>
  )
})
Button.displayName = "Button"

export default Button
