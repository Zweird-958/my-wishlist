import type { VariantProps } from "class-variance-authority"
import { type ComponentPropsWithoutRef, type Ref, useCallback } from "react"
import type { View, ViewProps } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { dividerVariants } from "@/components/ui/divider/variants"

export type UseDividerProps = {
  ref?: Ref<View>
} & ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof dividerVariants>

const useDivider = ({
  style,
  color,
  size,
  isVertical,
  radius,
  ...props
}: UseDividerProps) => {
  const { tw } = useTheme()

  const getProps = useCallback<() => ViewProps>(
    () => ({
      style: [
        tw.style(dividerVariants({ color, size, isVertical, radius })),
        style,
      ],
      ...props,
    }),
    [color, isVertical, props, radius, size, style, tw],
  )

  return { getProps }
}

export default useDivider
