"use client"

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react"

import { useTranslation } from "@/app/i18n/client"
import { Filter } from "@/utils/config"

type Props<T extends string> = {
  items: {
    key: T
    label: string
  }[]
  onSelectionChange: (key: T) => void
  selectedItem: string
}

const WishListDropdown = <T extends Filter>({
  items,
  onSelectionChange,
  selectedItem,
}: Props<T>) => {
  const { t } = useTranslation()
  const handleSelectionChange = (keys: Selection) => {
    const key = Array.from(keys).join(", ").replaceAll("_", " ")
    onSelectionChange(key as T)
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{t(`filters.${selectedItem}`)}</Button>
      </DropdownTrigger>
      <DropdownMenu
        items={items}
        selectedKeys={new Set([selectedItem])}
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
      >
        {(item) => (
          <DropdownItem key={item.key}>
            {t(`filters.${item.label}`)}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default WishListDropdown
