import { type ReactNode, forwardRef } from "react"
import type { Modal as RNModal } from "react-native"

import { ModalProvider } from "@/components/ui/modal/modal-context"
import useModal, { type UseModalProps } from "@/components/ui/modal/use-modal"

export type ModalProps = { children: ReactNode } & UseModalProps

const Modal = forwardRef<RNModal, ModalProps>(({ children, ...props }, ref) => {
  const context = useModal({ ...props, ref })

  return <ModalProvider {...context}>{children}</ModalProvider>
})

export default Modal
