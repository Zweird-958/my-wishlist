import AsyncStorage from "@react-native-async-storage/async-storage"
import { Slot, SplashScreen, useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import React, { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import type { Theme } from "@/components/contexts/ThemeContext"
import Providers from "@/components/providers"
import config from "@/utils/config"
import getLocale from "@/utils/get-locale"

import "../i18n"

void SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [theme, setTheme] = useState<Theme>("system")

  const { i18n } = useTranslation()
  const router = useRouter()

  const getTheme = useCallback(async () => {
    const savedTheme = (await AsyncStorage.getItem(
      config.store.theme,
    )) as Theme | null

    return savedTheme ?? "system"
  }, [])

  useEffect(() => {
    void (async () => {
      const locale = await getLocale()

      void i18n.changeLanguage(locale)

      const currentTheme = await getTheme()
      setTheme(currentTheme)

      const token = await SecureStore.getItemAsync(config.store.session)

      if (!token) {
        router.replace("/sign-in")
      }

      await SplashScreen.hideAsync()
    })()
  }, [getTheme, i18n, router, setTheme])

  return (
    <Providers theme={theme}>
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
    </Providers>
  )
}

export default RootLayout
