"use client"

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps,
} from "@nextui-org/react"

import type { UserShared } from "@my-wishlist/types"

import useMutation from "../../hooks/useMutation"
import useUsersShared from "../../hooks/useUsersShared"
import { useTranslation } from "../AppContext"

type Props = {
  user: UserShared | null
} & Pick<Required<ModalProps>, "isOpen" | "onOpenChange">

const UnshareModal = ({ user, isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation("forms", "errors")
  const { removeUser } = useUsersShared()
  const { mutate, isPending } = useMutation({
    method: "delete",
    path: `/share/wish/${user?.id}`,
    onSuccess: () => {
      onOpenChange(false)

      if (!user) {
        return
      }

      removeUser(user.id)
    },
    errorsMap: {
      404: t("errors:userNotFound"),
    },
  })

  const handleSubmit = () => {
    if (!user) {
      return
    }

    mutate()
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="h-fit w-full max-w-lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{t("unshare.title")}</ModalHeader>
            <ModalBody>
              {t("unshare.information", { username: user?.username })}
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button onPress={onClose} color="danger">
                {t("unshare.cancel")}
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isPending}
              >
                {t("unshare.submit")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default UnshareModal
