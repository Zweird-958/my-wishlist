import { type VariantProps, cva } from "class-variance-authority"
import { type ComponentPropsWithoutRef, type Ref, useCallback } from "react"
import type { Pressable, View } from "react-native"
import { Gesture } from "react-native-gesture-handler"
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"

const buttonVariants = cva(
  "flex flex-row justify-center items-center p-3 w-full",
  {
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
  },
)

export type UseButtonProps = {
  ref?: Ref<View> | null
} & ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>

const useButton = ({
  style,
  radius,
  color,
  role,
  ...props
}: UseButtonProps) => {
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

  const getGestureProps = useCallback(
    () => ({ gesture: scaleHandler }),
    [scaleHandler],
  )

  const getProps = useCallback(
    () => ({
      style: [
        animatedStyle,
        tw.style(buttonVariants({ radius, color })),
        style,
      ],
      role: role ?? "button",
      ...props,
    }),
    [animatedStyle, color, props, radius, role, style, tw],
  )

  return {
    getProps,
    getGestureProps,
  }
}

export default useButton
