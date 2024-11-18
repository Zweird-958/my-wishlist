"use client"

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  type Selection,
} from "@nextui-org/react"
import { Button } from "@ui/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { useTranslation } from "../components/AppContext"

const SelectTheme = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const handleChangeTheme = (keys: Selection) => {
    const key = Array.from(keys).join(", ").replaceAll("_", " ")
    setTheme(key)
  }

  useEffect(() => {
    setIsLoading(!resolvedTheme)
  }, [resolvedTheme])

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button size="icon" variant="outline" isLoading={isLoading}>
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
