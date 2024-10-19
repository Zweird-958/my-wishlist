import { SplashScreen, Stack, useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/components/contexts/ThemeContext"
import HeaderLeft from "@/components/layout/header-left"
import HeaderTitle from "@/components/layout/header-title"
import config from "@/utils/config"
import getLocale from "@/utils/get-locale"
import { DRAWER_ITEMS, ROUTES, ROUTES_WITHOUT_DRAWER } from "@/utils/layout"

const StacksLayout = () => {
  const { tw, setTheme, getTheme } = useTheme()

  const { i18n } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    void (async () => {
      const locale = await getLocale()

      void i18n.changeLanguage(locale)

      const theme = await getTheme()
      setTheme(theme)

      const token = await SecureStore.getItemAsync(config.store.session)

      if (!token) {
        router.replace("/sign-in")
      }

      await SplashScreen.hideAsync()
    })()
  }, [getTheme, i18n, router, setTheme])

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: (props) => <HeaderLeft {...props} />,
        headerStyle: tw.style("bg-card"),
      }}
    >
      {DRAWER_ITEMS.map(({ name, label }) => (
        <Stack.Screen
          name={name}
          key={name}
          options={{
            animation: "none",
            headerTitle: () => <HeaderTitle label={label} />,
          }}
        />
      ))}
      {ROUTES.map(({ name, label }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{ headerTitle: () => <HeaderTitle label={label} /> }}
        />
      ))}
      {ROUTES_WITHOUT_DRAWER.map(({ name, label }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            headerTitle: () => <HeaderTitle label={label} />,
            headerLeft: (props) => <HeaderLeft {...props} hideDrawer />,
          }}
        />
      ))}
    </Stack>
  )
}

export default StacksLayout
