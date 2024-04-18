"use client"

import { useSubmit } from "@hyper-fetch/react"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import { deleteWish } from "@my-wishlist/api/routes/wish"
import { Wish } from "@my-wishlist/types/Wish"

import { useTranslation } from "@/app/i18n/client"
import useHandleError from "@/hooks/useHandleError"
import useWishlist from "@/hooks/useWishlist"

type Props = {
  wish: Wish
}

const DeleteWish = ({ wish }: Props) => {
  const { removeWish } = useWishlist()
  const { t } = useTranslation("forms", "errors")
  const { handleError } = useHandleError({ 404: t("errors:wishNotFound") })

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = (open: boolean) => setIsOpen(open)
  const close = () => handleOpen(false)

  const { submit, submitting, onSubmitFinished, onSubmitSuccess } =
    useSubmit(deleteWish)
  const onSubmit = () => {
    submit({ params: { wishId: wish.id } })
  }
  onSubmitFinished(handleError)
  onSubmitSuccess(() => {
    close()
    toast.success(t("forms:wish.delete.success"))
    removeWish(wish)
  })

  return (
    <Popover
      placement="bottom"
      color="danger"
      showArrow={true}
      isOpen={isOpen}
      onOpenChange={handleOpen}
      size="lg"
    >
      <PopoverTrigger>
        <Button isIconOnly size="sm" className="px-2" color="danger">
          <Trash2Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="gap-2 items-start py-2 text-tiny">
        <p className="text-left">{t("forms:wish.delete.confirmation")}</p>
        <p>{t("forms:wish.delete.information")}</p>
        <div className="flex justify-between w-full min-w-52">
          <Button size="sm" onPress={close}>
            {t("forms:wish.cancel")}
          </Button>
          <Button
            size="sm"
            variant="bordered"
            onPress={onSubmit}
            isLoading={submitting}
          >
            {t("forms:wish.delete.submit")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeleteWish
