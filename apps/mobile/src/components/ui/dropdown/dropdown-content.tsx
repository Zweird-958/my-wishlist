import { useHeaderHeight } from "@react-navigation/elements"
import type { VariantProps } from "class-variance-authority"
import { type ComponentPropsWithoutRef, forwardRef } from "react"
import type { View } from "react-native"
import Animated from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useDropdownContext } from "@/components/ui/dropdown/dropdown-context"
import { dropdownContentVariants } from "@/components/ui/dropdown/variants"
import useDOMRef from "@/hooks/useDOMRef"

export type DropdownContentProps = ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof dropdownContentVariants>

const DropdownContent = forwardRef<View, DropdownContentProps>(
  ({ children, style, color, radius, ...props }, ref) => {
    const { tw } = useTheme()
    const { gap, measure, open, scaleStyle } = useDropdownContext()
    const headerHeight = useHeaderHeight()
    const domRef = useDOMRef(ref)

    if (!open || !measure) {
      return null
    }

    return (
      <Animated.View
        ref={domRef}
        style={[
          tw.style(dropdownContentVariants({ color, radius })),
          scaleStyle,
          {
            top: measure.y - headerHeight + measure.height + gap,
            minWidth: measure.width,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Animated.View>
    )
  },
)

export default DropdownContent
