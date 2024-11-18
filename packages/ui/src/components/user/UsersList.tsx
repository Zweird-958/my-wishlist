"use client"

import {
  Listbox,
  ListboxItem,
  type ListboxProps,
  ListboxSection,
} from "@nextui-org/react"
import { Spinner } from "@ui/components/ui/spinner"
import Link from "next/link"
import type { ReactNode } from "react"

import type { UserShared } from "@my-wishlist/types"

import { useTranslation } from "../AppContext"

type Props = {
  items: UserShared[]
  isLink?: boolean
  isLoading?: boolean
  icon: ReactNode
  title: string
} & Pick<ListboxProps, "color" | "onAction">

const UsersList = ({
  items,
  isLink,
  isLoading,
  icon,
  color = "primary",
  title,
  onAction,
}: Props) => {
  const { t } = useTranslation()
  const getListboxItem = () => {
    if (isLoading) {
      return (
        <ListboxItem key="loader" className="text-center">
          <Spinner size="lg" />
        </ListboxItem>
      )
    }

    if (items.length === 0) {
      return <ListboxItem key="empty">{t("emptyWishlistShared")}</ListboxItem>
    }

    return items.map((item) =>
      isLink ? (
        <ListboxItem
          endContent={icon}
          key={item.id}
          as={Link}
          href={`/share/${item.id}`}
        >
          {item.username}
        </ListboxItem>
      ) : (
        <ListboxItem endContent={icon} key={item.id}>
          {item.username}
        </ListboxItem>
      ),
    )
  }

  return (
    <Listbox
      aria-label="wishlist shared"
      color={color}
      variant="flat"
      disabledKeys={["loader", "empty"]}
      onAction={onAction}
    >
      <ListboxSection title={title}>{getListboxItem()}</ListboxSection>
    </Listbox>
  )
}

export default UsersList
