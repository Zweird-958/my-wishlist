import { cva } from "class-variance-authority"

export const dropdownContentVariants = cva("items-center absolute z-10", {
  variants: {
    radius: {
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },
    color: {
      primary: "bg-primary",
      success: "bg-success",
      danger: "bg-danger",
      warning: "bg-warning",
      card: "bg-card",
    },
  },
  defaultVariants: {
    radius: "medium",
    color: "card",
  },
})
