"use client"

import { useFetch } from "@hyper-fetch/react"
import { useDisclosure } from "@nextui-org/react"
import { ChevronRight, Trash2 } from "lucide-react"
import { Key, useState } from "react"

import { getWishlistShared } from "@my-wishlist/api/routes/sharedWishes"
import { UserShared } from "@my-wishlist/types/User"

import useUsersShared from "../../hooks/useUsersShared"
import AddButton from "../AddButton"
import { useTranslation } from "../AppContext"
import ShareForm from "../user/ShareForm"
import UnshareModal from "../user/UnshareModal"
import UsersList from "../user/UsersList"

const ShareSection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <AddButton onPress={onOpen} color="primary" />
      <ShareForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

const UsersShared = () => {
  const { t } = useTranslation()
  const {
    data: wishlistShared,
    loading: sharedLoading,
    error: sharedError,
  } = useFetch(getWishlistShared)
  const { usersShared, isLoading: usersLoading } = useUsersShared()
  const [userSelected, setUserSelected] = useState<UserShared | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleOnAction = (userId: Key) => {
    setUserSelected(
      usersShared.find((user) => user.id === parseInt(userId.toString(), 10)) ??
        null,
    )
    onOpen()
  }

  return (
    <div className="flex flex-col gap-4 h-fit w-full max-w-lg mx-auto">
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
        icon={<Trash2 className="w-4 h-4" />}
        color="danger"
        title={t("shared.with")}
        onAction={handleOnAction}
      />
      <UnshareModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        user={userSelected}
      />
      <ShareSection />
    </div>
  )
}

export default UsersShared
