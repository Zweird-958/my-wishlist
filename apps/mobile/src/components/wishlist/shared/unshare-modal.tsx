import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { useClient, useMutation } from "@my-wishlist/react"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlistAccessUsers } from "@/components/contexts/wishlist-access-users-context"
import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalClose,
  ModalContent,
  type ModalProps,
} from "@/components/ui/modal"
import { Text } from "@/components/ui/text"

type Props = Required<Pick<ModalProps, "open" | "setOpen">>

const UnshareModal = ({ open, setOpen }: Props) => {
  const { tw } = useTheme()
  const { removeUser, selectedUser: user } = useWishlistAccessUsers()
  const { t } = useTranslation()
  const { client } = useClient()
  const { mutate, isPending } = useMutation(
    client.share.wish[":userId"].$delete,
    {
      mutationKey: ["delete-user"],
      onSuccess: () => {
        setOpen(false)

        if (!user) {
          return
        }

        removeUser(user.id)
      },
    },
  )

  const onSubmit = () => {
    if (!user) {
      return
    }

    mutate({ param: { userId: user.id.toString() } })
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <ModalContent style={tw.style("gap-3")}>
        <Text color="card-foreground">{t("forms.unshare.title")}</Text>
        <Text style={tw.style("text-xs text-card-foreground/80")}>
          {t("forms.unshare.information", { username: user?.username })}
        </Text>
        <View style={tw.style("flex-row justify-between gap-4")}>
          <ModalClose isText style={tw.style("flex-1")}>
            {t("forms.unshare.cancel")}
          </ModalClose>
          <Button
            color="danger"
            isText
            style={tw.style("flex-1")}
            isLoading={isPending}
            onPress={onSubmit}
          >
            {t("forms.unshare.submit")}
          </Button>
        </View>
      </ModalContent>
    </Modal>
  )
}

export default UnshareModal
