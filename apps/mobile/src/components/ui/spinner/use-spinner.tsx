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
  "absolute w-full h-full rounded-full border-solid border-t-transparent border-l-transparent border-r-transparent border-2",
  {
    variants: {
      color: {
        primary: "border-b-primary",
        success: "border-b-success",
        danger: "border-b-danger",
        card: "border-b-card",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  },
)

export type UseSpinnerProps = {
  ref?: Ref<View>
} & ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof spinnerVariants>

const useSpinner = ({ style, color, ...props }: UseSpinnerProps) => {
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
      style: [circleAnimationStyle, tw.style(spinnerVariants({ color }))],
    }),
    [circleAnimationStyle, color, tw],
  )

  const getCircle2Props = useCallback(
    () => ({
      style: [
        circle2AnimationStyle,
        tw.style(spinnerVariants({ color }), "opacity-60"),
      ],
    }),
    [circle2AnimationStyle, color, tw],
  )

  const getWrapperProps = useCallback<() => UseSpinnerProps>(
    () => ({
      style: [tw.style("relative flex w-8 h-8"), style],
      "aria-label": ariaLabel,
      ...props,
    }),
    [ariaLabel, props, style, tw],
  )

  return {
    getWrapperProps,
    getCircle1Props,
    getCircle2Props,
  }
}

export default useSpinner
