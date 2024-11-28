/* eslint-disable max-lines */
import { type VariantProps, tv } from "tailwind-variants"

export const dropdownMenuVariants = tv({
  slots: {
    content: [
      "z-50 min-w-[8rem] overflow-hidden rounded-md p-2 shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    ],
    subTrigger:
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    subContent:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border-2 p-1 shadow-lg",
    item: "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
    checkboxItem:
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    radioItem:
      "relative flex cursor-default select-none items-center justify-between gap-4 rounded-sm p-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    label: "px-2 py-1.5 text-sm font-semibold",
    separator: "bg-muted -mx-1 my-1 h-px",
    shortcut: "ml-auto text-xs tracking-widest opacity-60",
  },
  variants: {
    inset: {
      true: "",
    },
    variant: {
      outline: {
        content: "bg-content text-content-foreground border-2",
        subContent: "bg-content text-content-foreground",
      },
      solid: {
        content: "box-shadow",
        subTrigger:
          "data-[state=open]:bg-accent focus:bg-accent/80 transition-colors",
        subContent: "border-accent",
        item: "focus:bg-accent/80 focus:text-accent-foreground",
        checkboxItem: "focus:bg-accent/80 focus:text-accent-foreground",
        radioItem: "focus:text-accent-foreground focus:bg-accent/80",
      },
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      danger: "",
      success: "",
      warning: "",
    },
  },
  compoundSlots: [
    {
      slots: ["subTrigger", "item", "label"],
      inset: true,
      className: "pl-8",
    },
  ],
  compoundVariants: [
    {
      color: "primary",
      variant: "outline",
      className: {
        content: "border-primary",
        subTrigger: "data-[state=open]:bg-primary focus:bg-primary/80",
        subContent: "border-primary",
        item: "focus:bg-primary/80 focus:text-primary-foreground",
        checkboxItem: "focus:bg-primary/80 focus:text-primary-foreground",
        radioItem: "focus:text-primary-foreground focus:bg-primary/80",
      },
    },
    {
      color: "secondary",
      variant: "outline",
      className: {
        content: "border-secondary",
        subTrigger: "data-[state=open]:bg-secondary focus:bg-secondary/80",
        subContent: "border-secondary",
        item: "focus:bg-secondary/80 focus:text-secondary-foreground",
        checkboxItem: "focus:bg-secondary/80 focus:text-secondary-foreground",
        radioItem: "focus:text-secondary-foreground focus:bg-secondary/80",
      },
    },
    {
      color: "default",
      variant: "outline",
      className: {
        content: "border-accent",
        subTrigger: "data-[state=open]:bg-accent focus:bg-accent/80",
        subContent: "border-accent",
        item: "focus:bg-accent/80 focus:text-accent-foreground",
        checkboxItem: "focus:bg-accent/80 focus:text-accent-foreground",
        radioItem: "focus:text-accent-foreground focus:bg-accent/80",
      },
    },
    {
      color: "danger",
      variant: "outline",
      className: {
        content: "border-danger",
        subTrigger: "data-[state=open]:bg-danger focus:bg-danger/80",
        subContent: "border-danger",
        item: "focus:bg-danger/80 focus:text-danger-foreground",
        checkboxItem: "focus:bg-danger/80 focus:text-danger-foreground",
        radioItem: "focus:text-danger-foreground focus:bg-danger/80",
      },
    },
    {
      color: "success",
      variant: "outline",
      className: {
        content: "border-success",
        subTrigger: "data-[state=open]:bg-success focus:bg-success/80",
        subContent: "border-success",
        item: "focus:bg-success/80 focus:text-success-foreground",
        checkboxItem: "focus:bg-success/80 focus:text-success-foreground",
        radioItem: "focus:text-success-foreground focus:bg-success/80",
      },
    },
    {
      color: "warning",
      variant: "outline",
      className: {
        content: "border-warning",
        subTrigger: "data-[state=open]:bg-warning focus:bg-warning/80",
        subContent: "border-warning",
        item: "focus:bg-warning/80 focus:text-warning-foreground",
        checkboxItem: "focus:bg-warning/80 focus:text-warning-foreground",
        radioItem: "focus:text-warning-foreground focus:bg-warning/80",
      },
    },
    {
      color: "primary",
      variant: "solid",
      className: {
        content: "bg-primary text-primary-foreground",
        subContent: "bg-primary text-primary-foreground",
      },
    },
    {
      color: "secondary",
      variant: "solid",
      className: {
        content: "bg-secondary text-secondary-foreground",
        subContent: "bg-secondary text-secondary-foreground",
      },
    },
    {
      color: "default",
      variant: "solid",
      className: {
        content: "bg-content text-content-foreground",
        subContent: "bg-content text-content-foreground",
      },
    },
    {
      color: "success",
      variant: "solid",
      className: {
        content: "bg-success text-success-foreground",
        subContent: "bg-success text-success-foreground",
      },
    },
    {
      color: "danger",
      variant: "solid",
      className: {
        content: "bg-danger text-danger-foreground",
        subContent: "bg-danger text-danger-foreground",
      },
    },
    {
      color: "warning",
      variant: "solid",
      className: {
        content: "bg-warning text-warning-foreground",
        subContent: "bg-warning text-warning-foreground",
      },
    },
  ],
  defaultVariants: {
    color: "default",
    inset: false,
    variant: "outline",
  },
})

export type DropdownMenuVariantsProps = VariantProps<
  typeof dropdownMenuVariants
>
