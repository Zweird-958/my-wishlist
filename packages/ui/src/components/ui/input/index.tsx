import {
  type InputVariantsProps,
  inputVariants,
} from "@ui/components/ui/input/theme"
import * as React from "react"

export type InputProps = React.ComponentProps<"input"> & InputVariantsProps

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, shadow, ...props }, ref) => (
    <input
      type={type}
      className={inputVariants({ className, shadow })}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = "Input"

export { Input }
