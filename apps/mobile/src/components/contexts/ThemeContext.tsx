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
export type ResolvedTheme = Exclude<Theme, "system">

type Context = {
  themeColors: RNTheme["colors"]
  tw: ReturnType<typeof create>
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  resolvedTheme: ResolvedTheme
  getTheme: () => Promise<Theme>
  changeTheme: (newTheme: Theme) => Promise<void>
}

const ThemeContext = createContext<Context>({} as Context)

type Props = {
  darkTheme?: RNTheme["colors"]
  lightTheme?: RNTheme["colors"]
  children: ReactNode
}

export const ThemeProvider = ({
  darkTheme = DarkTheme,
  lightTheme = LightTheme,
  children,
}: Props) => {
  const colorScheme = useColorScheme()

  const [theme, setTheme] = useState<Theme>("system")
  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (theme === "system") {
      return colorScheme ?? "light"
    }

    return theme
  }, [colorScheme, theme])
  const tw = resolvedTheme === "dark" ? create(darkConfig) : create(lightConfig)
  const themeColors = resolvedTheme === "dark" ? darkTheme : lightTheme

  const getTheme = useCallback(async () => {
    const savedTheme = (await AsyncStorage.getItem(
      config.store.theme,
    )) as Theme | null

    return savedTheme ?? "system"
  }, [])

  const changeTheme = useCallback(
    async (newTheme: Theme) => {
      await AsyncStorage.setItem(config.store.theme, newTheme)
      setTheme(newTheme)
    },
    [setTheme],
  )

  return (
    <ThemeContext.Provider
      value={{
        themeColors,
        tw,
        theme,
        setTheme,
        resolvedTheme,
        getTheme,
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
