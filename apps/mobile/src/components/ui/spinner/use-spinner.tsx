import { type VariantProps, cva } from "class-variance-authority"
import {
  type ComponentPropsWithoutRef,
  type Ref,
  useCallback,
  useMemo,
} from "react"
import type { ActivityIndicatorProps, View } from "react-native"
import {
  Easing,
  type EasingFunction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"

const DURATION = 1000

const spinnerVariants = cva(
  "absolute h-full w-full rounded-full border-solid border-l-transparent border-r-transparent border-t-transparent",
  {
    variants: {
      color: {
        primary: "border-b-primary",
        success: "border-b-success",
        danger: "border-b-danger",
        card: "border-b-card",
        warning: "border-b-warning",
        "primary-foreground": "border-b-primary-foreground",
        "success-foreground": "border-b-success-foreground",
        "danger-foreground": "border-b-danger-foreground",
        "card-foreground": "border-b-card-foreground",
        "warning-foreground": "border-b-warning-foreground",
      },
      size: {
        sm: "border-2",
        md: "border-2",
        lg: "border-[2.5px]",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  },
)
const wrapperVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "ios:w-6 ios:h-6 android:w-8 android:h-8",
      lg: "ios:w-10 ios:h-10 android:w-12 android:h-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const activitySize = {
  sm: 16,
  md: 32,
  lg: 48,
}

export type UseSpinnerProps = {
  ref?: Ref<View>
  color?: NonNullable<VariantProps<typeof spinnerVariants>["color"]>
  size?: NonNullable<VariantProps<typeof spinnerVariants>["size"]>
} & ComponentPropsWithoutRef<typeof View>

const useSpinner = ({
  style,
  color = "primary",
  size = "md",
  ...props
}: UseSpinnerProps) => {
  const { tw } = useTheme()

  const useAnimationStyle = (easing: EasingFunction) => {
    const rotation = useSharedValue(0)
    rotation.value = withRepeat(
      withTiming(360, {
        duration: DURATION,
        easing,
      }),
      -1,
    )

    return useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }))
  }

  const circleAnimationStyle = useAnimationStyle(Easing.linear)
  const circle2AnimationStyle = useAnimationStyle(Easing.ease)

  const ariaLabel = useMemo(() => props["aria-label"] ?? "Loading", [props])

  const getCircle1Props = useCallback(
    () => ({
      style: [circleAnimationStyle, tw.style(spinnerVariants({ color, size }))],
    }),
    [circleAnimationStyle, color, size, tw],
  )

  const getCircle2Props = useCallback(
    () => ({
      style: [
        circle2AnimationStyle,
        tw.style(spinnerVariants({ color, size }), "opacity-60"),
      ],
    }),
    [circle2AnimationStyle, color, size, tw],
  )

  const getWrapperProps = useCallback<() => UseSpinnerProps>(
    () => ({
      style: [tw.style(wrapperVariants({ size })), style],
      "aria-label": ariaLabel,
      ...props,
    }),
    [ariaLabel, props, size, style, tw],
  )

  const getActivityIndicatorProps = useCallback<() => ActivityIndicatorProps>(
    () => ({
      color: tw.color(color),
      size: activitySize[size],
    }),
    [color, size, tw],
  )

  return {
    getWrapperProps,
    getCircle1Props,
    getCircle2Props,
    getActivityIndicatorProps,
  }
}

export default useSpinner
