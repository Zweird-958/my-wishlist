import { X } from "lucide-react-native"
import { type ComponentPropsWithoutRef, forwardRef } from "react"
import {
  type GestureResponderEvent,
  Modal,
  Pressable,
  type View,
} from "react-native"
import Animated from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { useModalContext } from "@/components/ui/modal/modal-context"
import useDOMRef from "@/hooks/useDOMRef"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type ModalContentProps = ComponentPropsWithoutRef<typeof View>

const ModalContent = forwardRef<View, ModalContentProps>(
  ({ children, style, ...props }, contentRef) => {
    const { open, hideModal, contentStyle, scaleStyle, getModalProps } =
      useModalContext()
    const { tw } = useTheme()
    const domRef = useDOMRef(contentRef)

    const handlePressBackground = () => {
      hideModal()
    }

    const handlePressContent = (event: GestureResponderEvent) => {
      event.preventDefault()
    }

    return (
      <Modal
        transparent={true}
        visible={open}
        onRequestClose={hideModal}
        {...getModalProps()}
      >
        <Pressable
          style={tw.style("flex-1 justify-center items-center")}
          onPress={handlePressBackground}
        >
          <AnimatedPressable
            onPress={handlePressContent}
            style={[scaleStyle, contentStyle, style]}
            ref={domRef}
            {...props}
          >
            <Button
              style={tw.style("absolute z-10 top-0 right-0 bg-transparent")}
              isIconOnly
              onPress={hideModal}
            >
              <X size={16} color={tw.color("card-foreground")} />
            </Button>
            {children}
          </AnimatedPressable>
        </Pressable>
      </Modal>
    )
  },
)

export default ModalContent
