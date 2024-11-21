import { Slot, Slottable } from "@radix-ui/react-slot"
import {
  type ButtonVariantsProps,
  buttonVariants,
} from "@ui/components/ui/button/theme"
import { Spinner } from "@ui/components/ui/spinner"
import * as React from "react"

export type ButtonProps = {
  asChild?: boolean
  isLoading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantsProps

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
        className={buttonVariants({ color, variant, size, className })}
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

export { Button }
