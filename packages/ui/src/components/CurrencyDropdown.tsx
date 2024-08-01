"use client"

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  type DropdownMenuProps,
  DropdownTrigger,
} from "@nextui-org/react"

import type { Currency } from "@my-wishlist/types"

type Props = {
  currency: Currency
  currencies: Currency[]
} & Pick<DropdownMenuProps, "onSelectionChange">

const CurrencyDropdown = ({
  onSelectionChange,
  currency,
  currencies,
}: Props) => (
  <Dropdown>
    <DropdownTrigger>
      <Button variant="bordered" size="lg" className="w-full capitalize">
        {currency}
      </Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Get currency"
      variant="flat"
      disallowEmptySelection
      selectionMode="single"
      selectedKeys={new Set([currency])}
      onSelectionChange={onSelectionChange}
    >
      {currencies.map((item) => (
        <DropdownItem key={item}>{item}</DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
)

export default CurrencyDropdown
