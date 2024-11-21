import { tv } from "tailwind-variants"

export const dropdownMenuVariants = tv({
  slots: {
    content: [
      "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border-2 p-1 shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    ],
    subTrigger:
      "focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    subContent:
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border-2 p-1 shadow-lg",
    item: "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
    checkboxItem:
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    radioItem:
      "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center justify-between gap-4 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    label: "px-2 py-1.5 text-sm font-semibold",
    separator: "bg-muted -mx-1 my-1 h-px",
    shortcut: "ml-auto text-xs tracking-widest opacity-60",
  },
  variants: {
    inset: {
      true: "",
    },
  },
  compoundSlots: [
    {
      slots: ["subTrigger", "item", "label"],
      inset: true,
      className: "pl-8",
    },
  ],
})
