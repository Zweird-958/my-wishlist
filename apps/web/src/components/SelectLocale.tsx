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
import { useState } from "react"

import config, { type Locale } from "@my-wishlist/config"
import Flag from "@my-wishlist/ui/ui/Flag"

import useLocale from "@/hooks/useLocale"

const SelectLocale = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { locale, changeLocale } = useLocale()
  const handleChangeLocale = async (keys: Selection) => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    const key = Array.from(keys).join(", ").replaceAll("_", " ") as Locale
    await changeLocale(key)
    setIsLoading(false)
  }

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            isIconOnly
            className="p-0"
            variant="bordered"
            isLoading={isLoading}
          >
            <Flag language={config.flags[locale] ?? ""} />
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        variant="faded"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={new Set([locale])}
        aria-label="Select locale"
        items={config.languages.map((lang) => ({
          key: lang,
          label: config.languagesLabel[lang],
        }))}
        onSelectionChange={handleChangeLocale}
      >
        {(item) => (
          <DropdownItem
            key={item.key}
            startContent={<Flag language={config.flags[item.key] ?? ""} />}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default SelectLocale
