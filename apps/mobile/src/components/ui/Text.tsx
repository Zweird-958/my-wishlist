import { type VariantProps, cva } from "class-variance-authority"
import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { Text as RNText } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"

const textVariants = cva("", {
  variants: {
    color: {
      primary: "text-primary",
      success: "text-success",
      danger: "text-danger",
      foreground: "text-foreground",
    },
  },
  defaultVariants: {
    color: "foreground",
  },
})

type TextProps = ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof textVariants>

export const Text = forwardRef<RNText, TextProps>(
  ({ style, color, ...props }, ref) => {
    const { tw } = useTheme()

    return (
      <RNText
        style={[tw.style(textVariants({ color })), style]}
        ref={ref}
        {...props}
      />
    )
  },
)
