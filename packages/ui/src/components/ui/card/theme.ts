import { type VariantProps, tv } from "tailwind-variants"

export const cardVariants = tv({
  slots: {
    base: [
      "relative flex flex-col",
      "box-border h-auto overflow-hidden outline-none",
      "bg-card text-card-foreground",
    ],
    header: [
      "flex shrink-0 items-center justify-start",
      "overflow-inherit color-inherit subpixel-antialiased",
      "z-10 w-full p-3",
    ],
    body: [
      "relative flex flex-1 flex-col",
      "h-auto w-full p-3",
      "place-content-inherit align-items-inherit overflow-y-auto break-words text-left subpixel-antialiased",
    ],
    footer: [
      "h-auto w-full p-3",
      "flex items-center",
      "color-inherit overflow-hidden subpixel-antialiased",
    ],
    title: "font-semibold leading-none tracking-tight",
    description: "text-muted-foreground text-sm",
  },
  variants: {
    shadow: {
      none: {
        base: "shadow-none",
      },
      sm: {
        base: "shadow-small",
      },
      md: {
        base: "shadow-medium",
      },
      lg: {
        base: "shadow-large",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
        header: "rounded-none",
        footer: "rounded-none",
      },
      sm: {
        base: "rounded-sm",
        header: "rounded-t-sm",
        footer: "rounded-b-sm",
      },
      md: {
        base: "rounded-md",
        header: "rounded-t-md",
        footer: "rounded-b-md",
      },
      lg: {
        base: "rounded-lg",
        header: "rounded-t-lg",
        footer: "rounded-b-lg",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isBlurred: {
      true: "",
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      isPressable: true,
      className: "tap-highlight-transparent data-[pressed=true]:scale-[0.97]",
    },
  ],
  compoundSlots: [
    {
      slots: ["base", "header", "footer", "body"],
      className: "bg-card/20 backdrop-blur-md backdrop-saturate-150",
      isBlurred: true,
    },
  ],
  defaultVariants: {
    radius: "lg",
    shadow: "md",
    fullWidth: false,
    isPressable: false,
    isDisabled: false,
    isBlurred: false,
  },
})

type CardVariants = VariantProps<typeof cardVariants>

export type CardVariantsProps = Pick<
  CardVariants,
  "fullWidth" | "isDisabled" | "shadow" | "isBlurred"
>
export type CardHeaderVariantsProps = Pick<CardVariants, "radius" | "isBlurred">
export type CardFooterVariantsProps = Pick<CardVariants, "radius" | "isBlurred">
export type CardBodyVariantsProps = Pick<CardVariants, "radius" | "isBlurred">
