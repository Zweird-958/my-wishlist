import { cva } from "class-variance-authority"

export const inputColors = cva("", {
  variants: {
    color: {
      card: "card",
      primary: "primary",
      danger: "danger",
      success: "success",
      warning: "warning",
    },
    focused: {
      card: "card/80",
      primary: "primary/80",
      danger: "danger/80",
      success: "success/80",
      warning: "warning/80",
    },
    placeholder: {
      card: "foreground/70",
      primary: "primary-foreground/70",
      danger: "danger-foreground/70",
      success: "success-foreground/70",
      warning: "warning-foreground/70",
    },
  },
})

export const inputVariants = cva("flex-1", {
  variants: {
    color: {
      card: "text-card-foreground",
      primary: "text-primary-foreground",
      danger: "text-danger-foreground",
      success: "text-success-foreground",
      warning: "text-warning-foreground",
    },
  },
})
