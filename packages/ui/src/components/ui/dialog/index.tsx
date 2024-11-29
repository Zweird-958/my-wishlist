import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  DialogProvider,
  useDialogContext,
} from "@ui/components/ui/dialog/context"
import { type DialogVariantsProps } from "@ui/components/ui/dialog/theme"
import { ScrollArea } from "@ui/components/ui/scroll-area"
import { X } from "lucide-react"
import * as React from "react"

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> &
  DialogVariantsProps

const Dialog = ({ shadow, ...props }: DialogProps) => (
  <DialogProvider shadow={shadow}>
    <DialogPrimitive.Root {...props} />
  </DialogProvider>
)

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { slots } = useDialogContext()

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={slots.overlay({ className })}
      {...props}
    />
  )
})
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { slots } = useDialogContext()

  return (
    <DialogPortal>
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={slots.content({ className })}
          {...props}
        >
          <ScrollArea className="max-h-[95vh] p-6">{children}</ScrollArea>
          <DialogPrimitive.Close className={slots.close()}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { slots } = useDialogContext()

  return <div className={slots.header({ className })} {...props} />
}
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { slots } = useDialogContext()

  return <div className={slots.footer({ className })} {...props} />
}
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  const { slots } = useDialogContext()

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={slots.title({ className })}
      {...props}
    />
  )
})
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  const { slots } = useDialogContext()

  return (
    <DialogPrimitive.Description
      ref={ref}
      className={slots.description({ className })}
      {...props}
    />
  )
})
DialogDescription.displayName = DialogPrimitive.Description.displayName

const useDialog = () => {
  const [open, setOpen] = React.useState(false)

  const onOpen = React.useCallback(() => setOpen(true), [setOpen])
  const onClose = React.useCallback(() => setOpen(false), [setOpen])

  return { open, onOpen, onClose, onOpenChange: setOpen }
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useDialog,
}
