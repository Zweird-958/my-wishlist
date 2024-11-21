import * as DialogPrimitive from "@radix-ui/react-dialog"
import { dialogVariants } from "@ui/components/ui/dialog/theme"
import { ScrollArea } from "@ui/components/ui/scroll-area"
import { X } from "lucide-react"
import * as React from "react"

const Dialog = DialogPrimitive.Root

export type DialogProps = React.ComponentProps<typeof Dialog>

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={dialogVariants().overlay({ className })}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay>
      <DialogPrimitive.Content
        ref={ref}
        className={dialogVariants().content({ className })}
        {...props}
      >
        <ScrollArea className="max-h-[95vh] p-6">{children}</ScrollArea>
        <DialogPrimitive.Close className={dialogVariants().close()}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={dialogVariants().header({ className })} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={dialogVariants().footer({ className })} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={dialogVariants().title({ className })}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={dialogVariants().description({ className })}
    {...props}
  />
))
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
