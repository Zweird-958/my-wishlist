import { Moon, Sun } from "lucide-react-native"

import { type Theme, useTheme } from "@/components/contexts/ThemeContext"
import SettingsIconDropdown from "@/components/settings/settings-icon-dropdown"
import type { Item } from "@/components/ui/dropdown"

const THEME_ITEMS = [
  { label: "theme.system", value: "system" },
  { label: "theme.light", value: "light" },
  { label: "theme.dark", value: "dark" },
]

const ThemeDropdown = () => {
  const { resolvedTheme, changeTheme } = useTheme()
  const handleOnThemeChange = async ({ value }: Item) => {
    await changeTheme(value as Theme)
  }

  return (
    <SettingsIconDropdown
      onChange={handleOnThemeChange}
      items={THEME_ITEMS}
      icon={resolvedTheme === "dark" ? Moon : Sun}
    />
  )
}

export default ThemeDropdown
