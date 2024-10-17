import { SplashScreen, useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import Drawer from "@/components/layout/drawer"
import Providers from "@/components/providers"
import config from "@/utils/config"
import getLocale from "@/utils/get-locale"

import "../i18n"

void SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const { i18n } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    void (async () => {
      const locale = await getLocale()
      void i18n.changeLanguage(locale)
      const token = await SecureStore.getItemAsync(config.store.session)

      if (!token) {
        router.replace("/sign-in")
      }

      await SplashScreen.hideAsync()
    })()
  }, [i18n, router])

  return (
    <Providers>
      <GestureHandlerRootView>
        <Drawer />
      </GestureHandlerRootView>
    </Providers>
  )
}

export default RootLayout
