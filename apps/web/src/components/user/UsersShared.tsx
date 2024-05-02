"use client"

import {
  Listbox,
  ListboxItem,
  ListboxSection,
  Spinner,
} from "@nextui-org/react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { UserShared } from "@my-wishlist/types/User"

import { useTranslation } from "@/app/i18n/client"

type Props = {
  items: UserShared[]
  isLink?: boolean
  isLoading?: boolean
}

const UsersShared = ({ items, isLink, isLoading }: Props) => {
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
          endContent={<ChevronRight />}
          key={item.id}
          as={Link}
          href={`/share/${item.id}`}
        >
          {item.username}
        </ListboxItem>
      ) : (
        <ListboxItem endContent={<ChevronRight />} key={item.id}>
          {item.username}
        </ListboxItem>
      ),
    )
  }

  return (
    <div className="flex flex-col gap-4 h-fit w-full max-w-lg mx-auto">
      <Listbox
        aria-label="wishlist shared"
        color="primary"
        variant="flat"
        disabledKeys={["loader", "empty"]}
      >
        <ListboxSection title={t("sharedWithYou")}>
          {getListboxItem()}
        </ListboxSection>
      </Listbox>
    </div>
  )
}

export default UsersShared
