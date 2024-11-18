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
import { useState } from "react"

import { type Locale, config } from "@my-wishlist/i18n/config"

import Flag from "./Flag"

export type SelectLocaleProps = {
  changeLocale: (locale: Locale) => void
  locale: Locale
}

const SelectLocale = ({ changeLocale, locale }: SelectLocaleProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleChangeLocale = (keys: Selection) => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    const key = Array.from(keys).join(", ").replaceAll("_", " ") as Locale
    changeLocale(key)
    setIsLoading(false)
  }

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            className="p-0"
            variant="outline"
            size="icon"
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
            href=""
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
