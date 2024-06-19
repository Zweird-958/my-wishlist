"use client"

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react"

import { useTranslation } from "@my-wishlist/i18n"

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
  const handleSelectionChange = (keys: Selection) => {
    const key = Array.from(keys).join(", ").replaceAll("_", " ")
    onSelectionChange(key as T)
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          {t(`${translationKey}.${selectedItem}`)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        items={items}
        selectedKeys={new Set([selectedItem])}
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
      >
        {(item) => (
          <DropdownItem key={item.key}>
            {t(`${translationKey}.${item.label}`)}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default WishListDropdown
