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

import { useClient } from "@my-wishlist/react"
import type { UserShared } from "@my-wishlist/types"

import useMutation from "../../hooks/use-mutation"
import useUsersShared from "../../hooks/useUsersShared"
import { useTranslation } from "../AppContext"

type Props = {
  user: UserShared | null
} & Pick<Required<ModalProps>, "isOpen" | "onOpenChange">

const UnshareModal = ({ user, isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation("forms", "errors")
  const { removeUser } = useUsersShared()
  const { client } = useClient()
  const { mutate, isPending } = useMutation(
    client.share.wish[":userId"].$delete,
    {
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
    },
  )

  const handleSubmit = () => {
    if (!user) {
      return
    }

    mutate({ param: { userId: user.id.toString() } })
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
