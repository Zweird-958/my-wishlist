import * as SwitchPrimitives from "@radix-ui/react-switch"
import { switchVariants } from "@ui/components/ui/switch/theme"
import * as React from "react"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={switchVariants().root({ className })}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={switchVariants().thumb()} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
