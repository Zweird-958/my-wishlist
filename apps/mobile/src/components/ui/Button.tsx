import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react"
import { Pressable } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"
import tw from "@/utils/tw"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type ButtonProps = ComponentPropsWithoutRef<typeof Pressable>

export const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
  ({ style, ...props }, ref) => {
    const scaleDownAnimation = useSharedValue(1)
    const { theme } = useTheme()

    const scaleHandler = Gesture.LongPress()
      .onBegin(() => {
        scaleDownAnimation.value = withSpring(0.95)
      })
      .onFinalize(() => {
        scaleDownAnimation.value = withSpring(1)
      })

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scaleDownAnimation.value }],
    }))

    return (
      <GestureDetector gesture={scaleHandler}>
        <AnimatedPressable
          style={[
            animatedStyle,
            tw.style(
              "flex flex-row justify-center items-center p-3 rounded-md",
            ),
            { backgroundColor: theme.foreground },
            style,
          ]}
          ref={ref}
          role="button"
          {...props}
        />
      </GestureDetector>
    )
  },
)
Button.displayName = "Button"
