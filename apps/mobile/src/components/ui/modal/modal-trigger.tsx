import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { type GestureResponderEvent, type View } from "react-native"

import { Button } from "@/components/ui/button"
import { useModalContext } from "@/components/ui/modal/modal-context"
import useDOMRef from "@/hooks/useDOMRef"

export type ModalTriggerProps = ComponentPropsWithoutRef<typeof Button>

const ModalTrigger = forwardRef<View, ModalTriggerProps>(
  ({ children, onPress, ...props }, ref) => {
    const { showModal } = useModalContext()
    const domRef = useDOMRef(ref)

    const handleOnPress = (event: GestureResponderEvent) => {
      showModal()

      onPress?.(event)
    }

    return (
      <Button ref={domRef} onPress={handleOnPress} {...props}>
        {children}
      </Button>
    )
  },
)

export default ModalTrigger
