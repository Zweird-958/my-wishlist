import { type VariantProps, tv } from "tailwind-variants"

export const switchVariants = tv({
  slots: {
    root: "focus-visible:ring-ring focus-visible:ring-offset-background data-[state=unchecked]:bg-content shadow-small peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    thumb:
      "data-[state=unchecked]:bg-content-foreground shadow-large pointer-events-none block h-4 w-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
  },
  variants: {
    color: {
      default: {
        root: "data-[state=checked]:bg-default",
        thumb: "data-[state=checked]:bg-default-foreground",
      },
      primary: {
        root: "data-[state=checked]:bg-primary",
        thumb: "data-[state=checked]:bg-primary-foreground",
      },
      secondary: {
        root: "data-[state=checked]:bg-secondary",
        thumb: "data-[state=checked]:bg-secondary-foreground",
      },
      danger: {
        root: "data-[state=checked]:bg-danger",
        thumb: "data-[state=checked]:bg-danger-foreground",
      },
      warning: {
        root: "data-[state=checked]:bg-warning",
        thumb: "data-[state=checked]:bg-warning-foreground",
      },
      success: {
        root: "data-[state=checked]:bg-success",
        thumb: "data-[state=checked]:bg-success-foreground",
      },
    },
    shadow: {
      none: {
        root: "shadow-none",
        thumb: "shadow-none",
      },
      sm: {
        root: "shadow-small",
        thumb: "shadow-small",
      },
      md: {
        root: "shadow-medium",
        thumb: "shadow-medium",
      },
      lg: {
        root: "shadow-large",
        thumb: "shadow-large",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    shadow: "md",
  },
})

export type SwitchVariantsProps = VariantProps<typeof switchVariants>
