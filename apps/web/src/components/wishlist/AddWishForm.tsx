import { useSubmit } from "@hyper-fetch/react"
import { ModalProps } from "@nextui-org/react"
import toast from "react-hot-toast"

import { createWish } from "@my-wishlist/api/routes/wish"

import { useTranslation } from "@/app/i18n/client"
import WishForm from "@/components/wishlist/WishForm"
import useHandleError from "@/hooks/useHandleError"

type Props = Pick<ModalProps, "isOpen" | "onOpenChange">

const AddWishForm = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation("forms")
  const { handleError } = useHandleError<typeof createWish>()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(createWish)
  onSubmitFinished(handleError)
  onSubmitSuccess(() => {
    if (onOpenChange) {
      onOpenChange(false)
    }

    toast.success(t("addWish.success"))
  })
  const onSubmit = (data: FormData) => {
    submit({ data })
  }

  return (
    <WishForm
      onSubmit={onSubmit}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isLoading={submitting}
    />
  )
}

export default AddWishForm
