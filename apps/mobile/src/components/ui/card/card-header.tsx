import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useCardContext } from "@/components/ui/card/card-context"
import { headerVariants } from "@/components/ui/card/variants"
import useDOMRef from "@/hooks/useDOMRef"

export type CardHeaderProps = ComponentPropsWithoutRef<typeof View>

const CardHeader = forwardRef<View, CardHeaderProps>(
  ({ style, ...props }, ref) => {
    const { styles, radius } = useCardContext()
    const domRef = useDOMRef(ref)
    const { tw } = useTheme()

    return (
      <View
        {...props}
        ref={domRef}
        style={[tw.style(headerVariants({ radius })), styles?.header, style]}
      />
    )
  },
)

export default CardHeader
