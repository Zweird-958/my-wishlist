"use client"

import type { ModalProps } from "@nextui-org/react"
import toast from "react-hot-toast"

import type { Wish } from "@my-wishlist/types"

import useMutation from "../../hooks/useMutation"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"
import WishForm from "./WishForm"

type Props = Required<Pick<ModalProps, "isOpen" | "onOpenChange">>

const AddWishForm = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation("forms")
  const { addWish } = useWishlist()

  const { mutate, isPending } = useMutation<Wish, FormData>({
    method: "post",
    path: "/wish",
    onSuccess: ({ result }) => {
      onOpenChange(false)
      addWish(result)
      toast.success(t("wish.add.success"))
    },
  })

  const onSubmit = (data: FormData) => {
    mutate(data)
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
