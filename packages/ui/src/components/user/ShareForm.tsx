"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@ui/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  type DialogProps,
} from "@ui/components/ui/dialog"
import { Form as FormController, FormInput } from "@ui/components/ui/form"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { useClient } from "@my-wishlist/react"
import { shareSchema } from "@my-wishlist/schemas"

import useMutation from "../../hooks/use-mutation"
import useUsersShared from "../../hooks/useUsersShared"
import { useTranslation } from "../AppContext"

type FormProps = Pick<Required<DialogProps>, "onOpenChange">
type ShareFormProps = Pick<Required<DialogProps>, "open"> & FormProps

const Form = ({ onOpenChange }: FormProps) => {
  const { t } = useTranslation("forms")
  const { addUser } = useUsersShared()
  const form = useForm({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(shareSchema),
  })
  const { client } = useClient()
  const { mutate, isPending } = useMutation(client.share.wish.$post, {
    onSuccess: ({ result: user }) => {
      addUser(user)
      toast.success(t("share.success", { username: user.username }))
      onOpenChange(false)
    },
  })

  const handleOnSubmit = form.handleSubmit((data) => {
    mutate({ json: data })
  })

  return (
    <FormController {...form}>
      <form onSubmit={handleOnSubmit}>
        <FormInput name="username" label={t("username")} />
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button color="danger">{t("share.cancel")}</Button>
          </DialogClose>
          <Button type="submit" isLoading={isPending} color="primary">
            {t("share.submit")}
          </Button>
        </DialogFooter>
      </form>
    </FormController>
  )
}

const ShareForm = ({ open, onOpenChange }: ShareFormProps) => {
  const { t } = useTranslation("forms")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>{t("share.title")}</DialogHeader>
        <Form onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}

export default ShareForm
