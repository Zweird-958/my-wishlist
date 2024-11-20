import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { useClient, useMutation } from "@my-wishlist/react"
import { shareSchema } from "@my-wishlist/schemas"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlistAccessUsers } from "@/components/contexts/wishlist-access-users-context"
import { Button } from "@/components/ui/button"
import FormField from "@/components/ui/input/form-field"
import {
  Modal,
  ModalClose,
  ModalContent,
  type ModalProps,
} from "@/components/ui/modal"
import { Text } from "@/components/ui/text"

type Props = Required<Pick<ModalProps, "open" | "setOpen">>

const ShareModal = ({ open, setOpen }: Props) => {
  const { tw } = useTheme()
  const { t } = useTranslation()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(shareSchema),
  })
  const { addUser } = useWishlistAccessUsers()

  const { client } = useClient()
  const { mutate, isPending } = useMutation(client.share.wish.$post, {
    mutationKey: ["share-wish"],
    onSuccess: ({ result: user }) => {
      addUser(user)
      setOpen(false)
    },
  })

  const onSubmit = handleSubmit((data) => mutate({ json: data }))

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  return (
    <Modal open={open} setOpen={setOpen}>
      <ModalContent style={tw.style("gap-6")}>
        <Text color="card-foreground">{t("forms.share.title")}</Text>
        <FormField
          control={control}
          name="username"
          label={t("forms.username")}
          color="content"
          autoCapitalize="none"
        />
        <View style={tw.style("flex-row justify-between gap-4")}>
          <ModalClose isText style={tw.style("flex-1")}>
            {t("forms.share.cancel")}
          </ModalClose>
          <Button
            color="danger"
            isText
            style={tw.style("flex-1")}
            isLoading={isPending}
            onPress={onSubmit}
          >
            {t("forms.share.submit")}
          </Button>
        </View>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal
