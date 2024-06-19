"use client"

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  type Selection,
} from "@nextui-org/react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { useTranslation } from "@my-wishlist/i18n"

const SelectTheme = () => {
  const { t } = useTranslation()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const handleChangeTheme = (keys: Selection) => {
    const key = Array.from(keys).join(", ").replaceAll("_", " ")
    setTheme(key)
  }

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button isIconOnly variant="bordered" isLoading={!resolvedTheme}>
            {resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        variant="faded"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={new Set([theme ?? "system"])}
        aria-label="Select theme"
        onSelectionChange={handleChangeTheme}
      >
        <DropdownItem key="system">{t("theme.system")}</DropdownItem>
        <DropdownItem key="dark">{t("theme.dark")}</DropdownItem>
        <DropdownItem key="light">{t("theme.light")}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default SelectTheme
