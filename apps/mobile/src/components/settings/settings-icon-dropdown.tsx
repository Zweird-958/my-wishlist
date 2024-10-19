import type { LucideIcon } from "lucide-react-native"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  type DropdownProps,
  DropdownTrigger,
  type Item,
} from "@/components/ui/dropdown"

type Props = { items: Item[] } & (
  | { icon: LucideIcon; trigger?: never }
  | { trigger: ReactNode; icon?: never }
) &
  Required<Pick<DropdownProps, "onChange">>

const SettingsIconDropdown = ({
  items,
  onChange,
  icon: Icon,
  trigger,
}: Props) => {
  const { tw } = useTheme()
  const { t } = useTranslation()

  return (
    <View style={tw.style("items-end flex-1")}>
      <Dropdown onChange={onChange}>
        <DropdownTrigger isIconOnly style={tw.style("size-10")}>
          {Icon ? (
            <Icon size={20} color={tw.color("card-foreground")} />
          ) : (
            trigger
          )}
        </DropdownTrigger>

        <DropdownContent>
          {items.map(({ value, label }) => (
            <DropdownItem
              key={value}
              style={tw.style("px-12")}
              value={value}
              label={typeof label === "string" ? t(`settings.${label}`) : label}
              closeOnPress
            />
          ))}
        </DropdownContent>
      </Dropdown>
    </View>
  )
}

export default SettingsIconDropdown
