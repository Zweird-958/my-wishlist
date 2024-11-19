"use client"

import { useDialog } from "@ui/components/ui/dialog"
import { ChevronRight, Trash2 } from "lucide-react"
import { type Key, useState } from "react"

import { useClient } from "@my-wishlist/react"
import type { UserShared } from "@my-wishlist/types"

import { useProtectedQuery } from "../../hooks/use-query"
import useUsersShared from "../../hooks/useUsersShared"
import AddButton from "../AddButton"
import { useTranslation } from "../AppContext"
import ShareForm from "../user/ShareForm"
import UnshareModal from "../user/UnshareModal"
import UsersList from "../user/UsersList"

const ShareSection = () => {
  const { open, onOpen, onOpenChange } = useDialog()

  return (
    <>
      <AddButton onClick={onOpen} color="primary" />
      <ShareForm open={open} onOpenChange={onOpenChange} />
    </>
  )
}

const UsersShared = () => {
  const { t } = useTranslation()
  const { client } = useClient()
  const {
    data: wishlistShared,
    isLoading: sharedLoading,
    error: sharedError,
  } = useProtectedQuery(() => client.share.wish.$get(), {
    queryKey: ["shared"],
  })
  const { usersShared, isLoading: usersLoading } = useUsersShared()
  const [userSelected, setUserSelected] = useState<UserShared | null>(null)
  const { open, onOpen, onOpenChange } = useDialog()

  const handleOnAction = (userId: Key) => {
    setUserSelected(
      usersShared.find((user) => user.id === parseInt(userId.toString(), 10)) ??
        null,
    )
    onOpen()
  }

  return (
    <div className="mx-auto flex h-fit w-full max-w-lg flex-col gap-4">
      <UsersList
        items={wishlistShared?.result ?? []}
        isLink
        isLoading={sharedLoading || (!wishlistShared && !sharedError)}
        icon={<ChevronRight />}
        title={t("shared.withYou")}
      />
      <UsersList
        items={usersShared}
        isLoading={usersLoading}
        icon={<Trash2 className="h-4 w-4" />}
        color="danger"
        title={t("shared.with")}
        onAction={handleOnAction}
      />
      <UnshareModal
        open={open}
        onOpenChange={onOpenChange}
        user={userSelected}
      />
      <ShareSection />
    </div>
  )
}

export default UsersShared
