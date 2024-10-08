import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { type View } from "react-native"

import { Button } from "@/components/ui/button"
import { useModalContext } from "@/components/ui/modal/modal-context"
import useDOMRef from "@/hooks/useDOMRef"

export type ModalCloseProps = ComponentPropsWithoutRef<typeof Button>

const ModalClose = forwardRef<View, ModalCloseProps>(
  ({ onPress, ...props }, ref) => {
    const { hideModal } = useModalContext()
    const domRef = useDOMRef(ref)

    return <Button ref={domRef} onPress={onPress ?? hideModal} {...props} />
  },
)

export default ModalClose
