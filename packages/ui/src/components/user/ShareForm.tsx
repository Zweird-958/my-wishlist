"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps,
} from "@nextui-org/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { shareSchema } from "@my-wishlist/schemas"

import useClient from "../../hooks/use-client"
import useMutation from "../../hooks/use-mutation"
import useUsersShared from "../../hooks/useUsersShared"
import { useTranslation } from "../AppContext"
import Field from "../Field"

type FormProps = Pick<Required<ModalProps>, "onOpenChange" | "onClose">
type ShareFormProps = Pick<Required<ModalProps>, "isOpen" | "onOpenChange">

const Form = ({ onOpenChange, onClose }: FormProps) => {
  const { t } = useTranslation("forms")
  const { addUser } = useUsersShared()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(shareSchema),
  })
  const client = useClient()
  const { mutate, isPending } = useMutation(client.share.wish.$post, {
    onSuccess: ({ result: user }) => {
      addUser(user)
      toast.success(t("share.success", { username: user.username }))
      onOpenChange(false)
    },
  })
  const handleOnSubmit = handleSubmit((data) => {
    mutate({ json: data })
  })

  return (
    <form onSubmit={handleOnSubmit}>
      <ModalBody>
        <Field control={control} name="username" label={t("username")} />
      </ModalBody>
      <ModalFooter className="justify-between">
        <Button onPress={onClose} color="danger">
          {t("share.cancel")}
        </Button>
        <Button type="submit" isLoading={isPending} color="primary">
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
      className="h-fit w-full max-w-lg"
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
