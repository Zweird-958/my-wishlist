import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/components/ui/dialog"
import type { ComponentProps, ComponentPropsWithoutRef } from "react"

import WishForm from "./wish-form"

type Props = {
  title: string
  description: string
} & Required<
  Pick<ComponentPropsWithoutRef<typeof Dialog>, "open" | "onOpenChange">
> &
  Omit<ComponentProps<typeof WishForm>, "onClose">

const WishModalForm = ({
  open,
  onOpenChange,
  title,
  description,
  ...props
}: Props) => {
  const onClose = () => onOpenChange(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>{description}</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <WishForm {...props} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default WishModalForm
