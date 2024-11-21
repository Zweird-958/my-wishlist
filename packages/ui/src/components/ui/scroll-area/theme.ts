import { tv } from "tailwind-variants"

export const scrollAreaVariants = tv({
  slots: {
    root: "relative overflow-hidden",
    viewport: "h-full w-full rounded-[inherit]",
    scrollBar: "flex touch-none select-none p-[1px] transition-colors",
    thumb: "bg-border relative flex-1 rounded-full",
  },
  variants: {
    orientation: {
      vertical: "h-full w-2.5 border-l border-l-transparent",
      horizontal: "h-2.5 flex-col border-t border-t-transparent",
    },
  },
})
