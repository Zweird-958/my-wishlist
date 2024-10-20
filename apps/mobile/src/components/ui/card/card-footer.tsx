import { BlurView, type BlurViewProps } from "expo-blur"
import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { View, type ViewProps } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useCardContext } from "@/components/ui/card/card-context"
import { footerVariants } from "@/components/ui/card/variants"
import useDOMRef from "@/hooks/useDOMRef"

export type CardFooterProps = {
  styles?: {
    wrapper?: ViewProps["style"]
    blur?: BlurViewProps["style"]
  }
} & ComponentPropsWithoutRef<typeof View>

const CardFooter = forwardRef<View, CardFooterProps>(
  ({ style, styles: footerStyles, children, ...props }, ref) => {
    const { styles, radius, isFooterBlurred } = useCardContext()
    const domRef = useDOMRef(ref)
    const { tw } = useTheme()

    return (
      <View
        ref={domRef}
        style={[
          tw.style(footerVariants({ radius, isFooterBlurred })),
          styles?.footer,
          footerStyles?.wrapper,
          style,
        ]}
        {...props}
      >
        {isFooterBlurred ? (
          <BlurView
            intensity={30}
            style={[tw.style("flex p-3 w-full"), footerStyles?.blur]}
          >
            {children}
          </BlurView>
        ) : (
          children
        )}
      </View>
    )
  },
)

export default CardFooter
