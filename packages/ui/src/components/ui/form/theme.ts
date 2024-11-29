import { type VariantProps, tv } from "tailwind-variants"

export const formVariants = tv({
  slots: {
    item: "w-full space-y-2",
    label: "",
    description: "text-muted-foreground text-[0.8rem]",
    message: "text-danger text-sm font-medium",
    switch: "flex flex-row items-center justify-between",
  },
  variants: {
    error: {
      true: {
        label: "text-danger",
      },
    },
  },
})
