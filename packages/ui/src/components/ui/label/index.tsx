"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import {
  type LabelVariantsProps,
  labelVariants,
} from "@ui/components/ui/label/theme"
import { cn } from "@ui/utils/ui"
import * as React from "react"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    LabelVariantsProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
