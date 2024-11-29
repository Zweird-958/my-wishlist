"use client"

import { Button } from "@ui/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover"
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

  const [open, setOpen] = useState(false)
  const handleOpen = (isOpen: boolean) => setOpen(isOpen)
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
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" className="px-2" color="danger">
          <Trash2Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent variant="outline" color="danger">
        <p className="text-left">{t("forms:wish.delete.confirmation")}</p>
        <p className="text-sm">{t("forms:wish.delete.information")}</p>
        <div className="flex w-full min-w-52 justify-between">
          <Button size="sm" variant="outline" onClick={close}>
            {t("forms:wish.cancel")}
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={onSubmit}
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
