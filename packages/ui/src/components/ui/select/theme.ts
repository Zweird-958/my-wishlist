import { tv } from "tailwind-variants"

export const selectVariants = tv({
  slots: {
    trigger:
      "border-input placeholder:text-muted-foreground focus:border-ring relative flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border-2 bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    scrollUp: "flex cursor-default items-center justify-center py-1",
    scrollDown: "flex cursor-default items-center justify-center py-1",
    content: [
      "bg-popover text-popover-foreground data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border-2 shadow-md",
      "data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
    ],
    viewport: "p-1",
    label: "px-2 py-1.5 text-sm font-semibold",
    item: "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    separator: "bg-muted -mx-1 my-1 h-px",
  },
  variants: {
    position: {
      popper: {
        content:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        viewport:
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
      },
      "item-aligned": "",
    },
  },
})
