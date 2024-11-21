import { tv } from "tailwind-variants"

export const inputVariants = tv({
  base: "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring flex h-9 w-full rounded-md border-2 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
})
