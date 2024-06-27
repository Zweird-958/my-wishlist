"use client"

import { useSubmit } from "@hyper-fetch/react"
import { ModalProps } from "@nextui-org/react"
import toast from "react-hot-toast"

import { updateWish as updateWishRoute } from "@my-wishlist/api/routes/wish"
import { useTranslation } from "@my-wishlist/i18n/utils"
import { Wish } from "@my-wishlist/types/Wish"

import useHandleError from "../../hooks/useHandleError"
import useWishlist from "../../hooks/useWishlist"
import { SessionProps } from "../../types/session"
import WishForm from "./WishForm"

type Props = {
  wish: Wish
} & Pick<ModalProps, "isOpen" | "onOpenChange"> &
  SessionProps

const EditWishForm = ({ isOpen, onOpenChange, wish, session }: Props) => {
  const { t } = useTranslation("forms")
  const { handleError } = useHandleError<typeof updateWishRoute>()
  const { updateWish } = useWishlist(session)
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(updateWishRoute)
  onSubmitFinished(handleError)
  onSubmitSuccess(({ response: { result } }) => {
    if (onOpenChange) {
      onOpenChange(false)
    }

    toast.success(t("wish.update.success"))
    updateWish(result)
  })
  const onSubmit = (data: FormData) => {
    submit({ data, params: { wishId: wish.id } })
  }

  return (
    <WishForm
      title={t("wish.update.title")}
      submitText={t("wish.update.submit")}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={submitting}
      wish={wish}
    />
  )
}

export default EditWishForm
