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

import { useClient } from "@my-wishlist/react"
import { type Wish } from "@my-wishlist/types"

import useMutation from "../../hooks/use-mutation"
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

  const { client } = useClient()
  const { mutate, isPending } = useMutation(client.wish[":wishId"].$delete, {
    onSuccess: () => {
      close()
      toast.success(t("forms:wish.delete.success"))
      removeWish(wish)
    },
    errorsMap: { 404: t("errors:wishNotFound") },
  })
  const onSubmit = () => {
    mutate({ param: { wishId: wish.id.toString() } })
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
      <PopoverContent className="text-tiny items-start gap-2 py-2">
        <p className="text-left">{t("forms:wish.delete.confirmation")}</p>
        <p>{t("forms:wish.delete.information")}</p>
        <div className="flex w-full min-w-52 justify-between">
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
