import { cva } from "class-variance-authority"

export const dividerVariants = cva("", {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    isVertical: {
      true: "h-full",
      false: "w-full",
    },
    color: {
      primary: "bg-primary",
      card: "bg-card",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
      foreground: "bg-foreground",
      background: "bg-background",
    },
    radius: {
      none: "rounded-none",
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
    },
  },
  compoundVariants: [
    {
      isVertical: true,
      size: "xs",
      class: "w-0.5",
    },
    {
      isVertical: true,
      size: "sm",
      class: "w-1",
    },
    {
      isVertical: true,
      size: "md",
      class: "w-2",
    },
    {
      isVertical: true,
      size: "lg",
      class: "w-4",
    },
    {
      isVertical: true,
      size: "xl",
      class: "w-6",
    },
    {
      isVertical: false,
      size: "xs",
      class: "h-0.5",
    },
    {
      isVertical: false,
      size: "sm",
      class: "h-1",
    },
    {
      isVertical: false,
      size: "md",
      class: "h-2",
    },
    {
      isVertical: false,
      size: "lg",
      class: "h-4",
    },
    {
      isVertical: false,
      size: "xl",
      class: "h-6",
    },
  ],
  defaultVariants: {
    size: "xs",
    color: "card",
    isVertical: false,
    radius: "medium",
  },
})
