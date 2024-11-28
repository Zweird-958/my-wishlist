/* eslint-disable max-lines */
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenuProvider,
  useDropdownMenuContext,
} from "@ui/components/ui/dropdown-menu/context"
import { type DropdownMenuVariantsProps } from "@ui/components/ui/dropdown-menu/theme"
import { Check, ChevronRight } from "lucide-react"
import * as React from "react"

export type DropdownMenuProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Root
> &
  DropdownMenuVariantsProps

const DropdownMenu = ({
  children,
  color,
  inset,
  variant,
  ...props
}: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root {...props}>
    <DropdownMenuProvider color={color} inset={inset} variant={variant}>
      {children}
    </DropdownMenuProvider>
  </DropdownMenuPrimitive.Root>
)

export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
>

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, children, ...props }, ref) => {
  const { slots } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={slots.subTrigger({ className })}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
})
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => {
  const { slots } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={slots.subContent({ className })}
      {...props}
    />
  )
})
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => {
  const { slots } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={slots.content({ className })}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
})
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> &
  Pick<DropdownMenuVariantsProps, "color">

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, color: colorProp, ...props }, ref) => {
  const { slots, color } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={slots.item({ className, color: colorProp ?? color })}
      {...props}
    />
  )
})
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
> &
  Pick<DropdownMenuVariantsProps, "color">

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, color: colorProp, ...props }, ref) => {
  const { slots, color } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={slots.checkboxItem({ className, color: colorProp ?? color })}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
})
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

export type DropdownMenuRadioItemProps = {
  icon?: React.ReactNode
} & React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> &
  Pick<DropdownMenuVariantsProps, "color">

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, icon, color: colorProp, ...props }, ref) => {
  const { slots, color } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={slots.radioItem({ className, color: colorProp ?? color })}
      {...props}
    >
      {children}
      <span className="flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          {icon ?? <Check className="h-4 w-4" />}
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    </DropdownMenuPrimitive.RadioItem>
  )
})
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
>

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, ...props }, ref) => {
  const { slots } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={slots.label({ className })}
      {...props}
    />
  )
})
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  const { slots } = useDropdownMenuContext()

  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={slots.separator({ className })}
      {...props}
    />
  )
})
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  const { slots } = useDropdownMenuContext()

  return <span className={slots.shortcut({ className })} {...props} />
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
