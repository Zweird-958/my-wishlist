"use client"

import { Listbox, ListboxItem, Spinner } from "@nextui-org/react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { UserShared } from "@my-wishlist/types/User"

type Props = {
  items: UserShared[]
  isLink?: boolean
  isLoading?: boolean
}

const UsersShared = ({ items, isLink, isLoading }: Props) => {
  const getListboxItem = () => {
    if (isLoading) {
      return (
        <ListboxItem key="loader" className="text-center">
          <Spinner size="lg" />
        </ListboxItem>
      )
    }

    if (items.length === 0) {
      return <ListboxItem key="empty">empty</ListboxItem>
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
        {getListboxItem()}
      </Listbox>
    </div>
  )
}

export default UsersShared
