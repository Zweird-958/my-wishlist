import { type VariantProps, tv } from "tailwind-variants"

export const buttonVariants = tv({
  base: "focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "",
      outline: "border-1.5 bg-transparent",
      link: "underline-offset-4 hover:underline",
    },
    color: {
      primary: "",
      secondary: "",
      danger: "",
      success: "",
      default: "",
      muted: "",
      warning: "",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-small",
      md: "shadow-medium",
      lg: "shadow-large",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
    size: "default",
    shadow: "md",
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "outline",
      className: "border-primary text-primary",
    },
    {
      color: "secondary",
      variant: "outline",
      className: "border-secondary text-secondary",
    },
    {
      color: "danger",
      variant: "outline",
      className: "border-danger text-danger",
    },
    {
      color: "success",
      variant: "outline",
      className: "border-success text-success",
    },
    {
      color: "default",
      variant: "outline",
      className: "border-default text-foreground",
    },
    {
      color: "muted",
      variant: "outline",
      className: "border-muted text-muted",
    },
    {
      color: "warning",
      variant: "outline",
      className: "border-warning text-warning",
    },
    {
      color: "primary",
      variant: "default",
      className: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      color: "secondary",
      variant: "default",
      className: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    },
    {
      color: "danger",
      variant: "default",
      className: "bg-danger text-danger-foreground hover:bg-danger/90",
    },
    {
      color: "success",
      variant: "default",
      className: "bg-success text-success-foreground hover:bg-success/90",
    },
    {
      color: "muted",
      variant: "default",
      className: "bg-muted text-muted-foreground hover:bg-muted/90",
    },
    {
      color: "warning",
      variant: "default",
      className: "bg-warning text-warning-foreground hover:bg-warning/90",
    },
  ],
})

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>
