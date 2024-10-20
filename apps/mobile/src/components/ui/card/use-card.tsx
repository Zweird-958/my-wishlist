import { type VariantProps } from "class-variance-authority"
import {
  type ComponentPropsWithoutRef,
  type Ref,
  useCallback,
  useMemo,
} from "react"
import type { StyleProp, View, ViewStyle } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import type { CardContextType } from "@/components/ui/card/card-context"
import { cardVariants } from "@/components/ui/card/variants"
import useDOMRef from "@/hooks/useDOMRef"

export type UseCardProps = {
  ref?: Ref<View>
  styles?: {
    base?: StyleProp<ViewStyle>
    header?: StyleProp<ViewStyle>
    body?: StyleProp<ViewStyle>
    footer?: StyleProp<ViewStyle>
  }
  isFooterBlurred?: boolean
} & ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof cardVariants>

const useCard = ({
  ref,
  style,
  styles,
  children,
  radius,
  shadow,
  isFooterBlurred,
  ...props
}: UseCardProps) => {
  const { tw } = useTheme()
  const domRef = useDOMRef(ref)

  const getCardProps = useCallback(
    () => ({
      ref: domRef,
      style: [tw.style(cardVariants({ radius, shadow })), style, styles?.base],
      ...props,
    }),
    [domRef, props, radius, shadow, style, styles?.base, tw],
  )

  const context = useMemo<CardContextType>(
    () => ({
      styles,
      radius,
      isFooterBlurred,
    }),
    [isFooterBlurred, radius, styles],
  )

  return { getCardProps, children, context }
}

export default useCard
