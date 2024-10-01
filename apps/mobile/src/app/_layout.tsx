import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import Providers from "@/components/providers"
import getLocale from "@/utils/get-locale"

import "../i18n"

void SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    void (async () => {
      const locale = await getLocale()
      void i18n.changeLanguage(locale)

      await SplashScreen.hideAsync()
    })()
  }, [i18n])

  return (
    <Providers>
      <GestureHandlerRootView>
        <Stack />
      </GestureHandlerRootView>
    </Providers>
  )
}

export default RootLayout
