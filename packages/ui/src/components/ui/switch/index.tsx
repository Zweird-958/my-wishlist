import * as SwitchPrimitives from "@radix-ui/react-switch"
import {
  type SwitchVariantsProps,
  switchVariants,
} from "@ui/components/ui/switch/theme"
import * as React from "react"

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root> &
  SwitchVariantsProps

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, color, ...props }, ref) => {
  const slots = React.useMemo(() => switchVariants({ color }), [])

  return (
    <SwitchPrimitives.Root
      className={slots.root({ className })}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={slots.thumb()} />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
