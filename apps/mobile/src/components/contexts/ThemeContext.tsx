import {
  ThemeProvider as RNThemeProvider,
  type Theme,
} from "@react-navigation/native"
import { type ReactNode, createContext, useContext } from "react"
import { useColorScheme } from "react-native"
import { create } from "twrnc"

import {
  DarkTheme,
  LightTheme,
  darkConfig,
  lightConfig,
} from "@/constants/themes"

type Context = {
  theme: Theme["colors"]
  tw: ReturnType<typeof create>
}

const ThemeContext = createContext<Context>({} as Context)

type Props = {
  darkTheme?: Theme["colors"]
  lightTheme?: Theme["colors"]
  children: ReactNode
}

export const ThemeProvider = ({
  darkTheme = DarkTheme,
  lightTheme = LightTheme,
  children,
}: Props) => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? darkTheme : lightTheme
  const tw = colorScheme === "dark" ? create(darkConfig) : create(lightConfig)

  return (
    <ThemeContext.Provider value={{ theme, tw }}>
      <RNThemeProvider value={{ dark: true, colors: { ...theme } }}>
        {children}
      </RNThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
