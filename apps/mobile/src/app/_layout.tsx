import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import Providers from "@/app/providers"

const RootLayout = () => (
  <Providers>
    <GestureHandlerRootView>
      <Stack />
    </GestureHandlerRootView>
  </Providers>
)

export default RootLayout
