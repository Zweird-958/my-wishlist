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
import { useEffect, useState } from "react"

export type SelectThemeProps = {
  translations: {
    system: string
    dark: string
    light: string
  }
}

const SelectTheme = ({
  translations: { system, dark, light },
}: SelectThemeProps) => {
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
          <Button isIconOnly variant="bordered" isLoading={isLoading}>
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
        <DropdownItem key="system">{system}</DropdownItem>
        <DropdownItem key="dark">{dark}</DropdownItem>
        <DropdownItem key="light">{light}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default SelectTheme
