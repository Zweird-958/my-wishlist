import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps,
} from "@nextui-org/react"
import type { ComponentProps } from "react"

import WishForm from "./wish-form"

type Props = {
  title: string
} & Pick<ModalProps, "isOpen" | "onOpenChange"> &
  ComponentProps<typeof WishForm>

const WishModalForm = ({ isOpen, onOpenChange, title, ...props }: Props) => (
  <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    placement="center"
    className="h-fit w-full max-w-lg"
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <WishForm {...props} onClose={onClose} />
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
)

export default WishModalForm
