"use client"

import { useSubmit } from "@hyper-fetch/react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react"

import { unshareWishlist } from "@my-wishlist/api/routes/sharedWishes"
import { useTranslation } from "@my-wishlist/i18n"
import { UserShared } from "@my-wishlist/types/User"

import useHandleError from "@/hooks/useHandleError"
import useUsersShared from "@/hooks/useUsersShared"

type Props = {
  user: UserShared | null
} & Pick<Required<ModalProps>, "isOpen" | "onOpenChange">

const UnshareModal = ({ user, isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation("forms")
  const { handleError } = useHandleError()
  const { removeUser } = useUsersShared()
  const { submit, onSubmitFinished, onSubmitSuccess, submitting } =
    useSubmit(unshareWishlist)

  const handleSubmit = () => {
    if (!user) {
      return
    }

    submit({ params: { userId: user.id } })
  }

  onSubmitFinished(handleError)

  onSubmitSuccess(() => {
    onOpenChange(false)

    if (!user) {
      return
    }

    removeUser(user.id)
  })

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="h-fit max-w-lg w-full"
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
                isLoading={submitting}
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
