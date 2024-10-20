import { type VariantProps } from "class-variance-authority"
import {
  type ComponentPropsWithoutRef,
  type Dispatch,
  type Ref,
  type SetStateAction,
  useCallback,
} from "react"
import type { Modal } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { contentVariants } from "@/components/ui/modal/variants"
import useDOMRef from "@/hooks/useDOMRef"

type ModalProps = Omit<
  ComponentPropsWithoutRef<typeof Modal>,
  "children" | "transparent" | "visible" | "onRequestClose"
>

export type UseModalProps = {
  ref?: Ref<Modal>
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  onOpen?: () => void
} & ModalProps &
  VariantProps<typeof contentVariants>

const useModal = ({
  size,
  radius,
  ref,
  open,
  setOpen,
  onOpen,
  ...props
}: UseModalProps) => {
  const { tw } = useTheme()
  const contentStyle = tw.style(contentVariants({ size, radius }))
  const domRef = useDOMRef(ref)

  const getModalProps = useCallback<() => ModalProps>(
    () => ({
      ref: domRef,
      ...props,
    }),
    [domRef, props],
  )

  return { contentStyle, getModalProps, open, setOpen, onOpen }
}

export default useModal
