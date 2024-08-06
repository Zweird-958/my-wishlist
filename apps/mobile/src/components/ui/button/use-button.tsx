import { type VariantProps, cva } from "class-variance-authority"
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  useCallback,
} from "react"
import type { GestureResponderEvent, Pressable, View } from "react-native"
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
  isLoading?: boolean
  isDisabled?: boolean
  color?: NonNullable<VariantProps<typeof buttonVariants>["color"]>
  isText?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Pressable>, "children"> &
  Omit<VariantProps<typeof buttonVariants>, "color">

const useButton = ({
  style,
  radius,
  color = "primary",
  role,
  isLoading = false,
  isDisabled: isDisabledProp,
  children,
  isText,
  onPress,
  ...props
}: UseButtonProps) => {
  const scaleDownAnimation = useSharedValue(1)
  const { tw } = useTheme()

  const isDisabled = isDisabledProp ?? isLoading

  const scaleHandler = Gesture.LongPress()
    .onBegin(() => {
      if (isDisabled) {
        return
      }

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

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (isDisabled) {
        return
      }

      onPress?.(event)
    },
    [isDisabled, onPress],
  )

  const getButtonProps = useCallback(
    () => ({
      style: [
        animatedStyle,
        tw.style(buttonVariants({ radius, color }), {
          "opacity-disabled": isDisabled,
        }),
        style,
      ],
      role: role ?? "button",
      disabled: isLoading,
      onPress: handlePress,
      ...props,
    }),
    [
      animatedStyle,
      color,
      handlePress,
      isDisabled,
      isLoading,
      props,
      radius,
      role,
      style,
      tw,
    ],
  )

  const getTextProps = useCallback(() => {
    if (!isText) {
      return {}
    }

    return {
      color: `${color}-foreground` as const,
    }
  }, [color, isText])

  const getSpinnerProps = useCallback(
    () => ({
      color: `${color}-foreground` as const,
    }),
    [color],
  )

  return {
    isLoading,
    children,
    isText,
    getButtonProps,
    getGestureProps,
    getSpinnerProps,
    getTextProps,
  }
}

export default useButton
