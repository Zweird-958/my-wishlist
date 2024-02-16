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

import useLocale from "@/hooks/useLocale"

const SelectTheme = () => {
  const {
    translations: {
      common: { theme: themeTrans },
    },
  } = useLocale()
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
        <DropdownItem key="system">{themeTrans.system}</DropdownItem>
        <DropdownItem key="dark">{themeTrans.dark}</DropdownItem>
        <DropdownItem key="light">{themeTrans.light}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default SelectTheme
