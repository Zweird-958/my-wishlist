import { type VariantProps, cva } from "class-variance-authority"
import { type ComponentPropsWithoutRef, type Ref, useCallback } from "react"
import type { Text as RNText } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"

const textVariants = cva("", {
  variants: {
    color: {
      primary: "text-primary",
      success: "text-success",
      danger: "text-danger",
      foreground: "text-foreground",
      warning: "text-warning",
      "primary-foreground": "text-primary-foreground",
      "success-foreground": "text-success-foreground",
      "danger-foreground": "text-danger-foreground",
      "warning-foreground": "text-warning-foreground",
    },
  },
  defaultVariants: {
    color: "foreground",
  },
})

export type UseTextProps = {
  ref?: Ref<RNText>
} & ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof textVariants>

const useText = ({ style, color, ...props }: UseTextProps) => {
  const { tw } = useTheme()

  const getProps = useCallback(
    () => ({
      style: [tw.style(textVariants({ color })), style],
      ...props,
    }),
    [color, props, style, tw],
  )

  return { getProps }
}

export default useText
