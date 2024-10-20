import { cva } from "class-variance-authority"

export const contentVariants = cva("bg-card p-5 w-full", {
  variants: {
    radius: {
      none: "rounded-none",
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
    },
    size: {
      small: "max-w-2xs",
      medium: "max-w-xs",
      large: "max-w-md",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    radius: "medium",
    size: "medium",
  },
})
