import { inputVariants } from "@ui/components/ui/input/theme"
import * as React from "react"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={inputVariants({ className })}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = "Input"

export type InputProps = React.ComponentProps<typeof Input>

export { Input }
