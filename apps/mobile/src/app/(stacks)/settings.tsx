import { Moon, Sun } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { type Theme, useTheme } from "@/components/contexts/ThemeContext"
import SectionItem from "@/components/settings/section-item"
import SectionTitle from "@/components/settings/section-title"
import SettingsIconDropdown from "@/components/settings/settings-icon-dropdown"
import type { Item } from "@/components/ui/dropdown"

const THEME_ITEMS = [
  { label: "theme.system", value: "system" },
  { label: "theme.light", value: "light" },
  { label: "theme.dark", value: "dark" },
]

const Settings = () => {
  const { tw, resolvedTheme, changeTheme } = useTheme()
  const handleOnChange = async ({ value }: Item) => {
    await changeTheme(value as Theme)
  }
  const { t } = useTranslation()

  return (
    <View style={tw.style("p-4")}>
      <SectionTitle title="Paramètres de l'application" />
      <View style={tw.style("gap-4")}>
        <SectionItem name={t("settings.theme.title")}>
          <SettingsIconDropdown
            onChange={handleOnChange}
            items={THEME_ITEMS}
            icon={resolvedTheme === "dark" ? Moon : Sun}
          />
        </SectionItem>
      </View>
    </View>
  )
}

export default Settings
