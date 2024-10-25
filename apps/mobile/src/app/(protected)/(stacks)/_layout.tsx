import { Stack } from "expo-router"
import React from "react"

import { useTheme } from "@/components/contexts/ThemeContext"
import HeaderDrawerLeft from "@/components/layout/header-drawer-left"
import HeaderTitle from "@/components/layout/header-title"
import { DRAWER_ITEMS, PROTECTED_ROUTES } from "@/utils/layout"

const StacksLayout = () => {
  const { tw } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: (props) => <HeaderDrawerLeft {...props} />,
        headerStyle: tw.style("bg-card"),
        headerBackVisible: false,
      }}
    >
      {DRAWER_ITEMS.filter(({ href }) => href).map(({ name, label }) => (
        <Stack.Screen
          name={name}
          key={name}
          options={{
            animation: "none",
            headerTitle: () => <HeaderTitle label={label} />,
          }}
        />
      ))}
      {PROTECTED_ROUTES.map(({ name, label }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{ headerTitle: () => <HeaderTitle label={label} /> }}
        />
      ))}
    </Stack>
  )
}

export default StacksLayout
