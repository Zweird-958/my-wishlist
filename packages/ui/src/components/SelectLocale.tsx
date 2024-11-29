"use client"

import Flag from "@ui/components/Flag"
import { Button } from "@ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu"
import { useState } from "react"

import { type Locale, config } from "@my-wishlist/i18n/config"

type Props = {
  changeLocale: (locale: Locale) => void
  locale: Locale
}

const SelectLocale = ({ changeLocale, locale }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleChangeLocale = (newLocale: string) => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    changeLocale(newLocale as Locale)
    setIsLoading(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" isLoading={isLoading}>
          <Flag language={config.flags[locale] ?? ""} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleChangeLocale}
        >
          {config.languages.map((item) => (
            <DropdownMenuRadioItem key={item} value={item}>
              <div className="flex items-center gap-2">
                <Flag language={config.flags[item] ?? ""} />
                <span>{config.languagesLabel[item]}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectLocale
