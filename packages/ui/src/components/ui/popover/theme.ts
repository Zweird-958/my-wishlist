import { type VariantProps, tv } from "tailwind-variants"

export const popoverVariants = tv({
  slots: {
    content: [
      "z-50 w-72 rounded-md p-4 outline-none",
      "flex flex-col items-start gap-2 py-2",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    ],
  },
  variants: {
    variant: {
      solid: "",
      outline: {
        content: "bg-content text-content-foreground border",
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
    shadow: {
      none: {
        content: "shadow-none",
      },
      sm: {
        content: "shadow-small",
      },
      md: {
        content: "shadow-medium",
      },
      lg: {
        content: "shadow-large",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    color: "default",
    shadow: "md",
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "outline",
      className: {
        content: "border-primary",
      },
    },
    {
      color: "default",
      variant: "outline",
      className: {
        content: "border-accent",
      },
    },
    {
      color: "secondary",
      variant: "outline",
      className: {
        content: "border-secondary",
      },
    },
    {
      color: "success",
      variant: "outline",
      className: {
        content: "border-success",
      },
    },
    {
      color: "danger",
      variant: "outline",
      className: {
        content: "border-danger",
      },
    },
    {
      color: "warning",
      variant: "outline",
      className: {
        content: "border-warning",
      },
    },
    {
      color: "primary",
      variant: "solid",
      className: {
        content: "bg-primary text-primary-foreground",
      },
    },
    {
      color: "default",
      variant: "solid",
      className: {
        content: "bg-content text-content-foreground",
      },
    },
    {
      color: "secondary",
      variant: "solid",
      className: {
        content: "bg-secondary text-secondary-foreground",
      },
    },
    {
      color: "success",
      variant: "solid",
      className: {
        content: "bg-success text-success-foreground",
      },
    },
    {
      color: "danger",
      variant: "solid",
      className: {
        content: "bg-danger text-danger-foreground",
      },
    },
    {
      color: "warning",
      variant: "solid",
      className: {
        content: "bg-warning text-warning-foreground",
      },
    },
  ],
})

export type PopoverVariantsProps = VariantProps<typeof popoverVariants>
