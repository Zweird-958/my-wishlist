import { ThemeProvider as RNThemeProvider } from "@react-navigation/native"
import { type ReactNode, createContext, useContext } from "react"
import { useColorScheme } from "react-native"

import { DarkTheme, LightTheme } from "@/constants/themes"
import type { Theme } from "@/types/theme"

type Context = {
  theme: Theme
}

const ThemeContext = createContext<Context>({} as Context)

type NewType = {
  darkTheme?: Theme
  lightTheme?: Theme
  children: ReactNode
}

type Props = NewType

export const ThemeProvider = ({
  darkTheme = DarkTheme,
  lightTheme = LightTheme,
  children,
}: Props) => {
  const theme = useColorScheme() === "dark" ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme }}>
      <RNThemeProvider value={{ dark: true, colors: { ...theme } }}>
        {children}
      </RNThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
