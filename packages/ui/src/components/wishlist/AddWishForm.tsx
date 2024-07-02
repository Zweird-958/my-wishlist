"use client"

import { useSubmit } from "@hyper-fetch/react"
import { ModalProps } from "@nextui-org/react"
import toast from "react-hot-toast"

import { createWish } from "@my-wishlist/api/routes/wish"

import useHandleError from "../../hooks/useHandleError"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"
import WishForm from "./WishForm"

type Props = Pick<ModalProps, "isOpen" | "onOpenChange">

const AddWishForm = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation("forms")
  const { handleError } = useHandleError<typeof createWish>()
  const { addWish } = useWishlist()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(createWish)
  onSubmitFinished(handleError)
  onSubmitSuccess(({ response: { result } }) => {
    if (onOpenChange) {
      onOpenChange(false)
    }

    toast.success(t("wish.add.success"))
    addWish(result)
  })
  const onSubmit = (data: FormData) => {
    submit({ data })
  }

  return (
    <WishForm
      title={t("wish.add.title")}
      submitText={t("wish.add.submit")}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={submitting}
    />
  )
}

export default AddWishForm
