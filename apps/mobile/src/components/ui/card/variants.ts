import { cva } from "class-variance-authority"

export const cardVariants = cva("flex flex-col h-auto bg-card", {
  variants: {
    radius: {
      none: "rounded-none",
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
    },
    shadow: {
      none: "shadow-none",
      small: "shadow-sm",
      medium: "shadow-md",
      large: "shadow-lg",
    },
  },
  defaultVariants: {
    radius: "medium",
    shadow: "medium",
  },
})

export const footerVariants = cva("w-full", {
  variants: {
    radius: {
      none: "rounded-b-none",
      small: "rounded-b-sm",
      medium: "rounded-b-md",
      large: "rounded-b-lg",
    },
    isFooterBlurred: {
      true: "overflow-hidden",
      false: "flex flex-row p-3",
    },
  },
  defaultVariants: {
    radius: "medium",
  },
})

export const headerVariants = cva(
  "flex flex-row p-3 w-full items-center justify-start",
  {
    variants: {
      radius: {
        none: "rounded-t-none",
        small: "rounded-t-sm",
        medium: "rounded-t-md",
        large: "rounded-t-lg",
      },
    },
    defaultVariants: {
      radius: "medium",
    },
  },
)
