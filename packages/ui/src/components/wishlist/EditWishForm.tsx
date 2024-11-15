"use client"

import type { ModalProps } from "@nextui-org/react"
import toast from "react-hot-toast"

import { useClient } from "@my-wishlist/react"
import type { AddWishSchema, Wish } from "@my-wishlist/types"

import useMutation from "../../hooks/use-mutation"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"
import WishForm from "./wish-modal-form"

type Props = {
  wish: Wish
} & Required<Pick<ModalProps, "isOpen" | "onOpenChange">>

const EditWishForm = ({ isOpen, onOpenChange, wish }: Props) => {
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
      onSubmit={onSubmit}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={isPending}
      wish={wish}
    />
  )
}

export default EditWishForm
