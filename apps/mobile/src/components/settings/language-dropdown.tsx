import { useTranslation } from "react-i18next"

import { type Locale, config } from "@my-wishlist/config/i18n"

import SettingsIconDropdown from "@/components/settings/settings-icon-dropdown"
import type { Item } from "@/components/ui/dropdown"
import Flag from "@/components/ui/flag"

const LanguageDropdown = () => {
  const { i18n } = useTranslation()

  const handleOnChange = ({ value }: Item) => {
    void i18n.changeLanguage(value)
  }

  return (
    <SettingsIconDropdown
      onChange={handleOnChange}
      items={config.languages.map((lang) => ({
        value: lang,
        label: <Flag language={config.flags[lang] ?? ""} />,
      }))}
      trigger={<Flag language={config.flags[i18n.language as Locale] ?? ""} />}
    />
  )
}

export default LanguageDropdown
