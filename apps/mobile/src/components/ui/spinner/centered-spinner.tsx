import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Spinner, type SpinnerProps } from "@/components/ui/spinner"

type Props = SpinnerProps

const CenteredSpinner = (props: Props) => {
  const { tw } = useTheme()

  return (
    <View style={tw.style("h-full w-full items-center justify-center")}>
      <Spinner {...props} />
    </View>
  )
}

export default CenteredSpinner
