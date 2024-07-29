"use client"

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import {
  type DeleteWishInput,
  type DeleteWishResponse,
  type Wish,
} from "@my-wishlist/types"

import useMutation from "../../hooks/useMutation"
import useWishlist from "../../hooks/useWishlist"
import { useTranslation } from "../AppContext"

type Props = {
  wish: Wish
}

const DeleteWish = ({ wish }: Props) => {
  const { removeWish } = useWishlist()
  const { t } = useTranslation("forms")

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = (open: boolean) => setIsOpen(open)
  const close = () => handleOpen(false)

  const { mutate, isPending } = useMutation<
    DeleteWishResponse,
    DeleteWishInput
  >({
    method: "delete",
    path: ({ wishId }) => `/wish/${wishId}`,
    errorsMap: { 404: t("errors:wishNotFound") },
    onSuccess: () => {
      close()
      toast.success(t("forms:wish.delete.success"))
      removeWish(wish)
    },
  })
  const onSubmit = () => {
    mutate({ wishId: wish.id })
  }

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
            isLoading={isPending}
          >
            {t("forms:wish.delete.submit")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeleteWish
