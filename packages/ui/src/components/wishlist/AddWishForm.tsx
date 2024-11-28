"use client"

import type { DialogProps } from "@ui/components/ui/dialog"
import toast from "react-hot-toast"

import { useClient } from "@my-wishlist/react"
import type { AddWishSchema } from "@my-wishlist/types"

import useMutation from "../../hooks/use-mutation"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"
import WishForm from "./wish-modal-form"

type Props = Required<Pick<DialogProps, "open" | "onOpenChange">>

const AddWishForm = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation("forms")
  const { addWish } = useWishlist()
  const { client } = useClient()
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
      description={t("wish.add.description")}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isPending}
    />
  )
}

export default AddWishForm
