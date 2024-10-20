import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Spinner } from "@/components/ui/spinner"

const CenteredSpinner = () => {
  const { tw } = useTheme()

  return (
    <View style={tw.style("h-full w-full items-center justify-center")}>
      <Spinner />
    </View>
  )
}

export default CenteredSpinner
