import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  type Theme as RNTheme,
  ThemeProvider as RNThemeProvider,
} from "@react-navigation/native"
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useColorScheme } from "react-native"
import { create } from "twrnc"

import {
  DarkTheme,
  LightTheme,
  darkConfig,
  lightConfig,
} from "@/constants/themes"
import config from "@/utils/config"

export type Theme = "dark" | "light" | "system"
type ResolvedTheme = Exclude<Theme, "system">

type Context = {
  themeColors: RNTheme["colors"]
  tw: ReturnType<typeof create>
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  resolvedTheme: ResolvedTheme
  changeTheme: (newTheme: Theme) => Promise<void>
}

const ThemeContext = createContext<Context>({} as Context)

type Props = {
  darkTheme?: RNTheme["colors"]
  lightTheme?: RNTheme["colors"]
  theme: Theme
  children: ReactNode
}

export const ThemeProvider = ({
  darkTheme = DarkTheme,
  lightTheme = LightTheme,
  theme: defaultTheme,
  children,
}: Props) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const colorScheme = useColorScheme()

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (theme === "system") {
      return colorScheme ?? "light"
    }

    return theme
  }, [colorScheme, theme])

  const tw = resolvedTheme === "dark" ? create(darkConfig) : create(lightConfig)
  const themeColors = resolvedTheme === "dark" ? darkTheme : lightTheme

  const changeTheme = useCallback(
    async (newTheme: Theme) => {
      await AsyncStorage.setItem(config.store.theme, newTheme)
      setTheme(newTheme)
    },
    [setTheme],
  )

  useEffect(() => {
    setTheme(defaultTheme)
  }, [defaultTheme])

  return (
    <ThemeContext.Provider
      value={{
        themeColors,
        tw,
        theme,
        setTheme,
        resolvedTheme,
        changeTheme,
      }}
    >
      <RNThemeProvider
        value={{ dark: resolvedTheme === "dark", colors: { ...themeColors } }}
      >
        {children}
      </RNThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
