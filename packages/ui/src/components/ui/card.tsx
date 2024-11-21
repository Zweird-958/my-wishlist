/* eslint-disable max-lines */
import { cn } from "@ui/utils/ui"
import * as React from "react"
import { tv } from "tailwind-variants"

const card = tv({
  slots: {
    base: [
      "flex",
      "flex-col",
      "relative",
      "overflow-hidden",
      "h-auto",
      "outline-none",
      "text-foreground",
      "box-border",
      "bg-card",
      "text-card-foreground",
    ],
    header: [
      "flex",
      "p-3",
      "z-10",
      "w-full",
      "justify-start",
      "items-center",
      "shrink-0",
      "overflow-inherit",
      "color-inherit",
      "subpixel-antialiased",
    ],
    body: [
      "relative",
      "flex",
      "flex-1",
      "w-full",
      "p-3",
      "flex-auto",
      "flex-col",
      "place-content-inherit",
      "align-items-inherit",
      "h-auto",
      "break-words",
      "text-left",
      "overflow-y-auto",
      "subpixel-antialiased",
    ],
    footer: [
      "p-3",
      "h-auto",
      "flex",
      "w-full",
      "items-center",
      "overflow-hidden",
      "color-inherit",
      "subpixel-antialiased",
    ],
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
        base: "rounded-small",
        header: "rounded-t-small",
        footer: "rounded-b-small",
      },
      md: {
        base: "rounded-medium",
        header: "rounded-t-medium",
        footer: "rounded-b-medium",
      },
      lg: {
        base: "rounded-large",
        header: "rounded-t-large",
        footer: "rounded-b-large",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    isBlurred: {
      true: {
        base: [
          "bg-background/80",
          "dark:bg-background/20",
          "backdrop-blur-md",
          "backdrop-saturate-150",
        ],
      },
    },
    isFooterBlurred: {
      true: {
        footer: ["bg-background/10", "backdrop-blur", "backdrop-saturate-150"],
      },
    },
    isDisabled: {
      true: {
        base: "opacity-disabled cursor-not-allowed",
      },
    },
    disableAnimation: {
      true: "",
      false: {
        base: "transition-transform-background motion-reduce:transition-none",
      },
    },
  },
  compoundVariants: [
    {
      isPressable: true,
      class: "tap-highlight-transparent data-[pressed=true]:scale-[0.97]",
    },
  ],
  defaultVariants: {
    radius: "lg",
    shadow: "md",
    fullWidth: false,
    isHoverable: false,
    isPressable: false,
    isDisabled: false,
    isFooterBlurred: false,
  },
})

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={card().base({ className })} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={card().header({ className })} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={card().body({ className })} {...props} />
))
CardBody.displayName = "CardBody"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={card().footer({ className })} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle }
