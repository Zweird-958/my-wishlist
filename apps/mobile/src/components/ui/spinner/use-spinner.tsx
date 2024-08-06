import { type VariantProps, cva } from "class-variance-authority"
import {
  type ComponentPropsWithoutRef,
  type Ref,
  useCallback,
  useMemo,
} from "react"
import type { View } from "react-native"
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
  "absolute w-full h-full rounded-full border-solid border-t-transparent border-l-transparent border-r-transparent",
  {
    variants: {
      color: {
        primary: "border-b-primary",
        success: "border-b-success",
        danger: "border-b-danger",
        card: "border-b-card",
        "primary-foreground": "border-b-primary-foreground",
        "success-foreground": "border-b-success-foreground",
        "danger-foreground": "border-b-danger-foreground",
        "card-foreground": "border-b-card-foreground",
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
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type UseSpinnerProps = {
  ref?: Ref<View>
} & ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof spinnerVariants>

const useSpinner = ({ style, color, size, ...props }: UseSpinnerProps) => {
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

  return {
    getWrapperProps,
    getCircle1Props,
    getCircle2Props,
  }
}

export default useSpinner
