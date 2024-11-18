import { Slot, Slottable } from "@radix-ui/react-slot"
import { Spinner } from "@ui/components/ui/spinner"
import { cn } from "@ui/utils/ui"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent border-1.5",
        link: "underline-offset-4 hover:underline",
      },
      color: {
        primary: "",
        secondary: "",
        danger: "",
        success: "",
        accent: "",
        muted: "",
        warning: "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
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
        color: "accent",
        variant: "outline",
        className: "border-accent text-accent",
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
        className:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
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
        color: "accent",
        variant: "default",
        className: "bg-accent text-accent-foreground hover:bg-accent/90",
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
  },
)

export type ButtonProps = {
  asChild?: boolean
  isLoading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      asChild = false,
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ color, variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner color="current" size="sm" />}
        {isLoading && size === "icon" ? null : (
          <Slottable>{children}</Slottable>
        )}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
