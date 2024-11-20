"use client"

import { Spinner } from "@ui/components/ui/spinner"
import Link from "next/link"
import type { MouseEventHandler, ReactNode } from "react"

import type { UserShared } from "@my-wishlist/types"

import { useTranslation } from "../AppContext"

type Props = {
  items: UserShared[]
  isLink?: boolean
  isLoading?: boolean
  icon: ReactNode
  title: string
} & (
  | { isLink: true; onAction?: never }
  | { isLink?: false; onAction: MouseEventHandler<HTMLDivElement> }
)

const UsersList = ({
  items,
  isLink,
  isLoading,
  icon,
  title,
  onAction,
}: Props) => {
  const { t } = useTranslation()
  const getListboxItem = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner size="lg" />
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <div className="text-foreground py-4">{t("emptyWishlistShared")}</div>
      )
    }

    return items.map((item) =>
      isLink ? (
        <Link
          href={`/share/${item.id}`}
          className="hover:bg-primary hover:text-primary-foreground flex items-center justify-between rounded-md p-2 transition-colors"
        >
          <p>{item.username}</p>
          {icon}
        </Link>
      ) : (
        <div
          key={item.id}
          className="hover:bg-danger hover:text-danger-foreground flex items-center justify-between rounded-md p-2 transition-colors"
          data-id={item.id}
          onClick={onAction}
        >
          <p>{item.username}</p>
          {icon}
        </div>
      ),
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-muted-foreground text-xs">{title}</span>
      <div className="flex flex-col gap-1">{getListboxItem()}</div>
    </div>
  )
}

export default UsersList
