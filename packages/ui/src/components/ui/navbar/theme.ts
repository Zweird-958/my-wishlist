import { type Variants } from "framer-motion"
import { tv } from "tailwind-variants"

export const navbarVariants = tv({
  slots: {
    base: "bg-background/80 sticky top-0 z-40 flex items-center justify-between p-4 backdrop-blur-md",
    content: "flex items-center gap-4",
    menu: [
      "fixed inset-x-0 bottom-0 top-[var(--navbar-height)] z-30 w-screen max-w-full",
      "flex flex-col gap-2 overflow-y-auto px-6 pt-2",
      "bg-background/80 backdrop-blur-md",
    ],
    menuItem: "text-foreground",
    menuTrigger: "flex sm:hidden",
  },
})

export const menuVariants: Variants = {
  enter: {
    height: "calc(100dvh - var(--navbar-height))",
    transition: {
      duration: 0.3,
      easings: "easeOut",
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.25,
      easings: "easeIn",
    },
  },
}

export const menuIconTopVariants: Variants = {
  closed: {
    rotate: 0,
    translateY: 0,
  },
  opened: {
    rotate: 45,
    translateY: 2,
  },
}

export const menuIconCenterVariants: Variants = {
  closed: {
    opacity: 1,
  },
  opened: {
    opacity: 0,
  },
}

export const menuIconBottomVariants = {
  closed: {
    rotate: 0,
    translateY: 0,
  },
  opened: {
    rotate: -45,
    translateY: -2,
  },
}
