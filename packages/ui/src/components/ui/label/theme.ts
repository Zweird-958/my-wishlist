import { type VariantProps, tv } from "tailwind-variants"

export const labelVariants = tv({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
})

export type LabelVariantsProps = VariantProps<typeof labelVariants>
