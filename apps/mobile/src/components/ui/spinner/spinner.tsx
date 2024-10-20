import { forwardRef } from "react"
import { ActivityIndicator, Platform, View } from "react-native"
import Animated from "react-native-reanimated"

import useSpinner, {
  type UseSpinnerProps,
} from "@/components/ui/spinner/use-spinner"

export type SpinnerProps = UseSpinnerProps

const Spinner = forwardRef<View, SpinnerProps>((props, ref) => {
  const {
    getWrapperProps,
    getCircle1Props,
    getCircle2Props,
    getActivityIndicatorProps,
  } = useSpinner({
    ...props,
    ref,
  })

  return (
    <View {...getWrapperProps()}>
      {Platform.OS === "android" ? (
        <ActivityIndicator {...getActivityIndicatorProps()} />
      ) : (
        <>
          <Animated.View {...getCircle1Props()} />
          <Animated.View {...getCircle2Props()} />
        </>
      )}
    </View>
  )
})

Spinner.displayName = "Spinner"

export default Spinner
