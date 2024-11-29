import {
  type SpinnerVariantsProps,
  spinnerVariants,
} from "@ui/components/ui/spinner/theme"
import { type ComponentPropsWithoutRef, forwardRef, useMemo } from "react"

export type SpinnerProps = ComponentPropsWithoutRef<"div"> &
  SpinnerVariantsProps

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size, color, className, ...props }, ref) => {
    const slots = useMemo(() => spinnerVariants({ size, color }), [size, color])

    return (
      <div ref={ref} className={slots.base({ className })} {...props}>
        <div className={slots.wrapper()}>
          <i className={slots.circle1()} />
          <i className={slots.circle2()} />
        </div>
      </div>
    )
  },
)

Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
