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
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import config, { type Locale } from "@my-wishlist/config"
import Flag from "@my-wishlist/ui/ui/Flag"

import { useTranslation } from "@/app/i18n/client"

const SelectLocale = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { locale } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const handleChangeLocale = (keys: Selection) => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    const key = Array.from(keys).join(", ").replaceAll("_", " ") as Locale
    const regex = new RegExp(`^/(${config.languages.join("|")})`, "u")
    const pathWithoutLocale = pathname.replace(regex, "")
    router.push(`/${key}${pathWithoutLocale}`)
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
