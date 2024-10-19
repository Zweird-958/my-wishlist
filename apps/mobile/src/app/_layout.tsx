import { SplashScreen } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import Drawer from "@/components/layout/drawer"
import Providers from "@/components/providers"

import "../i18n"

void SplashScreen.preventAutoHideAsync()

const RootLayout = () => (
  <Providers>
    <GestureHandlerRootView>
      <Drawer />
    </GestureHandlerRootView>
  </Providers>
)

export default RootLayout
