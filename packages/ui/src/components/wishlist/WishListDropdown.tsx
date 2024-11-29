"use client"

import { Button } from "@ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu"

import { useTranslation } from "../AppContext"

type Props<T extends string> = {
  items: {
    key: T
    label: string
  }[]
  onSelectionChange: (key: T) => void
  selectedItem: string
  translationKey: string
}

const WishListDropdown = <T extends string>({
  items,
  onSelectionChange,
  selectedItem,
  translationKey,
}: Props<T>) => {
  const { t } = useTranslation()
  const handleSelectionChange = (key: string) => {
    onSelectionChange(key as T)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t(`${translationKey}.${selectedItem}`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={selectedItem}
          onValueChange={handleSelectionChange}
        >
          {items.map((item) => (
            <DropdownMenuRadioItem key={item.key} value={item.key}>
              {t(`${translationKey}.${item.label}`)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WishListDropdown
