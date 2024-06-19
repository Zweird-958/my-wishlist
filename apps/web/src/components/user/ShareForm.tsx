"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { shareWishlist } from "@my-wishlist/api/routes/sharedWishes"
import { useTranslation } from "@my-wishlist/i18n"
import { shareSchema } from "@my-wishlist/schemas"

import FormField from "@/components/ui/FormField"
import useHandleError from "@/hooks/useHandleError"
import useUsersShared from "@/hooks/useUsersShared"

type FormProps = Pick<Required<ModalProps>, "onOpenChange" | "onClose">
type ShareFormProps = Pick<Required<ModalProps>, "isOpen" | "onOpenChange">

const Form = ({ onOpenChange, onClose }: FormProps) => {
  const { t } = useTranslation("forms")
  const { addUser } = useUsersShared()
  const { handleError } = useHandleError()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(shareSchema),
  })
  const handleOnSubmit = handleSubmit((data) => {
    submit({ data })
  })
  const { submit, submitting, onSubmitSuccess, onSubmitFinished } =
    useSubmit(shareWishlist)

  onSubmitSuccess(({ response: { result } }) => {
    addUser(result.user)
    toast.success(t("share.success", { username: result.user.username }))
    onOpenChange(false)
  })
  onSubmitFinished(handleError)

  return (
    <form onSubmit={handleOnSubmit}>
      <ModalBody>
        <FormField control={control} name="username" label={t("username")} />
      </ModalBody>
      <ModalFooter className="justify-between">
        <Button onPress={onClose} color="danger">
          {t("share.cancel")}
        </Button>
        <Button type="submit" isLoading={submitting} color="primary">
          {t("share.submit")}
        </Button>
      </ModalFooter>
    </form>
  )
}

const ShareForm = ({ isOpen, onOpenChange }: ShareFormProps) => {
  const { t } = useTranslation("forms")

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
            <ModalHeader>{t("share.title")}</ModalHeader>
            <Form onClose={onClose} onOpenChange={onOpenChange} />
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ShareForm
