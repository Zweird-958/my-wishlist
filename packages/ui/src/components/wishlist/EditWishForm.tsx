"use client"

import { ModalProps } from "@nextui-org/react"
import toast from "react-hot-toast"

import { Wish } from "@my-wishlist/types/Wish"

import useMutation from "../../hooks/useMutation"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"
import WishForm from "./WishForm"

type Props = {
  wish: Wish
} & Required<Pick<ModalProps, "isOpen" | "onOpenChange">>

const EditWishForm = ({ isOpen, onOpenChange, wish }: Props) => {
  const { t } = useTranslation("forms")
  const { updateWish } = useWishlist()
  const { mutate, isPending } = useMutation<Wish, FormData>({
    method: "patch",
    path: `/wish/${wish.id}`,
    mutationKey: ["updateWish", wish.id],
    onSuccess: ({ result }) => {
      onOpenChange(false)
      toast.success(t("wish.update.success"))
      updateWish(result)
    },
  })
  const onSubmit = (data: FormData) => {
    mutate(data)
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
