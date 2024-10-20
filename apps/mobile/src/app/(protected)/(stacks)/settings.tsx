import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import LanguageDropdown from "@/components/settings/language-dropdown"
import SectionItem from "@/components/settings/section-item"
import SectionTitle from "@/components/settings/section-title"
import ThemeDropdown from "@/components/settings/theme-dropdown"

const Settings = () => {
  const { tw } = useTheme()
  const { t } = useTranslation()

  return (
    <View style={tw.style("p-4")}>
      <SectionTitle title={t("settings.appSettings")} />
      <View style={tw.style("gap-4")}>
        <SectionItem name={t("settings.theme.title")}>
          <ThemeDropdown />
        </SectionItem>
        <SectionItem name={t("settings.language.title")}>
          <LanguageDropdown />
        </SectionItem>
      </View>
    </View>
  )
}

export default Settings
