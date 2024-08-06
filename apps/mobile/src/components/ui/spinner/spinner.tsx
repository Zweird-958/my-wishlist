import { forwardRef } from "react"
import { View } from "react-native"
import Animated from "react-native-reanimated"

import useSpinner, {
  type UseSpinnerProps,
} from "@/components/ui/spinner/use-spinner"

export type SpinnerProps = UseSpinnerProps

const Spinner = forwardRef<View, SpinnerProps>((props, ref) => {
  const { getWrapperProps, getCircle1Props, getCircle2Props } = useSpinner({
    ...props,
    ref,
  })

  return (
    <View {...getWrapperProps()}>
      <Animated.View {...getCircle1Props()} />
      <Animated.View {...getCircle2Props()} />
    </View>
  )
})

Spinner.displayName = "Spinner"

export default Spinner
