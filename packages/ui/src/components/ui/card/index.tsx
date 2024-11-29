import {
  type CardBodyVariantsProps,
  type CardFooterVariantsProps,
  type CardHeaderVariantsProps,
  type CardVariantsProps,
  cardVariants,
} from "@ui/components/ui/card/theme"
import * as React from "react"

type CardProps = React.HTMLAttributes<HTMLDivElement> & CardVariantsProps

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, shadow, isBlurred, isDisabled, fullWidth, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants().base({
        shadow,
        isBlurred,
        isDisabled,
        fullWidth,
        className,
      })}
      {...props}
    />
  ),
)
Card.displayName = "Card"

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  CardHeaderVariantsProps

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, radius, isBlurred, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants().header({ radius, isBlurred, className })}
      {...props}
    />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cardVariants().title({ className })} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cardVariants().description({ className })}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

type CardBodyProps = React.HTMLAttributes<HTMLDivElement> &
  CardBodyVariantsProps

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, radius, isBlurred, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants().body({ radius, isBlurred, className })}
      {...props}
    />
  ),
)
CardBody.displayName = "CardBody"

type CardFooterProps = React.HTMLAttributes<HTMLDivElement> &
  CardFooterVariantsProps

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, radius, isBlurred, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants().footer({ radius, className, isBlurred })}
      {...props}
    />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle }
