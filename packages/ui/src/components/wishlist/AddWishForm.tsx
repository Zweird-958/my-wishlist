"use client"

import type { ModalProps } from "@nextui-org/react"
import toast from "react-hot-toast"

import type { AddWishSchema } from "@my-wishlist/types"

import useClient from "../../hooks/use-client"
import useMutation from "../../hooks/use-mutation"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"
import WishForm from "./wish-modal-form"

type Props = Required<Pick<ModalProps, "isOpen" | "onOpenChange">>

const AddWishForm = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation("forms")
  const { addWish } = useWishlist()
  const client = useClient()
  const { mutate, isPending } = useMutation(client.wish.$post, {
    onSuccess: ({ result }) => {
      onOpenChange(false)
      addWish(result)
      toast.success(t("wish.add.success"))
    },
  })

  const onSubmit = (data: AddWishSchema) => {
    mutate({ json: data })
  }

  return (
    <WishForm
      title={t("wish.add.title")}
      submitText={t("wish.add.submit")}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={isPending}
    />
  )
}

export default AddWishForm
