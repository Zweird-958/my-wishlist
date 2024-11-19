"use client"

import { Button } from "@ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { useTranslation } from "../components/AppContext"

const SelectTheme = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setIsLoading(!resolvedTheme)
  }, [resolvedTheme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" isLoading={isLoading}>
          {resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Select theme">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="system">
            {t("theme.system")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            {t("theme.dark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            {t("theme.light")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectTheme
