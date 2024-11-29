"use client"

import { Button } from "@ui/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  type DialogProps,
  DialogTitle,
} from "@ui/components/ui/dialog"

import { useClient } from "@my-wishlist/react"
import type { UserShared } from "@my-wishlist/types"

import useMutation from "../../hooks/use-mutation"
import useUsersShared from "../../hooks/useUsersShared"
import { useTranslation } from "../AppContext"

type Props = {
  user: UserShared | null
} & Pick<Required<DialogProps>, "open" | "onOpenChange">

const UnshareModal = ({ user, open, onOpenChange }: Props) => {
  const { t } = useTranslation("forms", "errors")
  const { removeUser } = useUsersShared()
  const { client } = useClient()
  const { mutate, isPending } = useMutation(
    client.share.wish[":userId"].$delete,
    {
      onSuccess: () => {
        onOpenChange(false)

        if (!user) {
          return
        }

        removeUser(user.id)
      },
      errorsMap: {
        404: t("errors:userNotFound"),
      },
    },
  )

  const handleSubmit = () => {
    if (!user) {
      return
    }

    mutate({ param: { userId: user.id.toString() } })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("unshare.title")}</DialogTitle>
          <DialogDescription>{t("unshare.description")}</DialogDescription>
        </DialogHeader>
        <p>{t("unshare.information", { username: user?.username })}</p>
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button color="danger">{t("unshare.cancel")}</Button>
          </DialogClose>
          <Button color="primary" onClick={handleSubmit} isLoading={isPending}>
            {t("unshare.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UnshareModal
