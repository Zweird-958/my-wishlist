import { Dialog, DialogContent, DialogHeader } from "@ui/components/ui/dialog"
import type { ComponentProps, ComponentPropsWithoutRef } from "react"

import WishForm from "./wish-form"

type Props = {
  title: string
} & Required<
  Pick<ComponentPropsWithoutRef<typeof Dialog>, "open" | "onOpenChange">
> &
  Omit<ComponentProps<typeof WishForm>, "onClose">

const WishModalForm = ({ open, onOpenChange, title, ...props }: Props) => {
  const onClose = () => onOpenChange(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        <WishForm {...props} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default WishModalForm
