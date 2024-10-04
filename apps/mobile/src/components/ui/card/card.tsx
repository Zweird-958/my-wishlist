import { forwardRef } from "react"
import { View } from "react-native"

import { CardProvider } from "@/components/ui/card/card-context"
import useCard, { type UseCardProps } from "@/components/ui/card/use-card"

export type CardProps = UseCardProps

const Card = forwardRef<View, CardProps>((props, ref) => {
  const { getCardProps, children, context } = useCard({ ref, ...props })

  return (
    <View {...getCardProps()}>
      <CardProvider {...context}>{children}</CardProvider>
    </View>
  )
})

export default Card
