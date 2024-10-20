import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useCardContext } from "@/components/ui/card/card-context"
import useDOMRef from "@/hooks/useDOMRef"

export type CardBodyProps = ComponentPropsWithoutRef<typeof View>

const CardBody = forwardRef<View, CardBodyProps>(({ style, ...props }, ref) => {
  const { styles } = useCardContext()
  const domRef = useDOMRef(ref)
  const { tw } = useTheme()

  return (
    <View
      ref={domRef}
      style={[tw.style("flex p-3 w-full flex-col"), styles?.body, style]}
      {...props}
    ></View>
  )
})

export default CardBody
