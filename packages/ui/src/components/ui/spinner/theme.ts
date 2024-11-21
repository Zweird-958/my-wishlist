import { type VariantProps, tv } from "tailwind-variants"

export const spinnerVariants = tv({
  slots: {
    base: "relative inline-flex flex-col items-center justify-center gap-2",
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
        wrapper: "h-5 w-5",
        circle1: "border-2",
        circle2: "border-2",
        label: "text-sm",
      },
      md: {
        wrapper: "h-8 w-8",
        circle1: "border-3",
        circle2: "border-3",
        label: "text-md",
      },
      lg: {
        wrapper: "h-10 w-10",
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

export type SpinnerVariantsProps = VariantProps<typeof spinnerVariants>
