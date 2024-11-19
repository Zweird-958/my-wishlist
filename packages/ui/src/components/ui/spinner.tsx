import { type ComponentPropsWithoutRef, forwardRef, useMemo } from "react"
import { type VariantProps, tv } from "tailwind-variants"

const spinnerVariants = tv({
  slots: {
    base: "relative inline-flex flex-col gap-2 items-center justify-center",
    wrapper: "relative flex",
    circle1: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "animate-spinner-ease-spin",
      "border-2",
      "border-solid",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent",
    ],
    circle2: [
      "absolute",
      "w-full",
      "h-full",
      "rounded-full",
      "opacity-75",
      "animate-spinner-linear-spin",
      "border-2",
      "border-dotted",
      "border-t-transparent",
      "border-l-transparent",
      "border-r-transparent",
    ],
  },
  variants: {
    size: {
      sm: {
        wrapper: "w-5 h-5",
        circle1: "border-2",
        circle2: "border-2",
        label: "text-sm",
      },
      md: {
        wrapper: "w-8 h-8",
        circle1: "border-3",
        circle2: "border-3",
        label: "text-md",
      },
      lg: {
        wrapper: "w-10 h-10",
        circle1: "border-3",
        circle2: "border-3",
        label: "text-lg",
      },
    },
    color: {
      current: {
        circle1: "border-b-current",
        circle2: "border-b-current",
      },
      primary: {
        circle1: "border-b-primary",
        circle2: "border-b-primary",
      },
      secondary: {
        circle1: "border-b-secondary",
        circle2: "border-b-secondary",
      },
      success: {
        circle1: "border-b-success",
        circle2: "border-b-success",
      },
      warning: {
        circle1: "border-b-warning",
        circle2: "border-b-warning",
      },
      danger: {
        circle1: "border-b-danger",
        circle2: "border-b-danger",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
})

export type SpinnerProps = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof spinnerVariants>

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
