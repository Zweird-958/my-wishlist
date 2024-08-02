import { type VariantProps, cva } from "class-variance-authority"
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const buttonVariants = cva("flex flex-row justify-center items-center p-3", {
  variants: {
    radius: {
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },
    color: {
      primary: "bg-primary",
      success: "bg-success",
      danger: "bg-danger",
    },
  },
  defaultVariants: {
    radius: "medium",
    color: "primary",
  },
})

type Variant = "primary" | "danger"
type ButtonProps = {
  variant?: Variant
} & ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>

export const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
  ({ style, color, radius, ...props }, ref) => {
    const scaleDownAnimation = useSharedValue(1)
    const { tw } = useTheme()

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
            tw.style(buttonVariants({ radius, color })),
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
