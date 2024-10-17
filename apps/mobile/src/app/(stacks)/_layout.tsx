import { Stack } from "expo-router"
import React from "react"

import { useTheme } from "@/components/contexts/ThemeContext"
import HeaderLeft from "@/components/layout/header-left"
import HeaderTitle from "@/components/layout/header-title"
import { DRAWER_ITEMS, ROUTES } from "@/utils/layout"

const StacksLayout = () => {
  const { tw } = useTheme()

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
      {ROUTES.filter(
        ({ name }) => !DRAWER_ITEMS.some((item) => item.name === name),
      ).map(({ name, label }) => (
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
