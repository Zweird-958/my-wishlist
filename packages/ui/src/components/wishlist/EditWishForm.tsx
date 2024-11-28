"use client"

import type { DialogProps } from "@ui/components/ui/dialog"
import toast from "react-hot-toast"

import { useClient } from "@my-wishlist/react"
import type { AddWishSchema, Wish } from "@my-wishlist/types"

import useMutation from "../../hooks/use-mutation"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"
import WishForm from "./wish-modal-form"

type Props = {
  wish: Wish
} & Required<Pick<DialogProps, "open" | "onOpenChange">>

const EditWishForm = ({ open, onOpenChange, wish }: Props) => {
  const { t } = useTranslation("forms")
  const { updateWish } = useWishlist()
  const { client } = useClient()
  const { mutate, isPending } = useMutation(client.wish[":wishId"].$patch, {
    onSuccess: ({ result }) => {
      onOpenChange(false)
      toast.success(t("wish.update.success"))
      updateWish(result)
    },
    mutationKey: ["updateWish", wish.id],
  })
  const onSubmit = (data: AddWishSchema) => {
    mutate({ json: data, param: { wishId: wish.id.toString() } })
  }

  return (
    <WishForm
      title={t("wish.update.title")}
      submitText={t("wish.update.submit")}
      description={t("wish.update.description")}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isPending}
      wish={wish}
    />
  )
}

export default EditWishForm
