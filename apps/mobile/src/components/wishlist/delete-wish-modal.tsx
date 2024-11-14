import { useTranslation } from "react-i18next"
import { View } from "react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlist } from "@/components/contexts/WishlistContext"
import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalClose,
  ModalContent,
  type ModalProps,
} from "@/components/ui/modal"
import { Text } from "@/components/ui/text"
import useClient from "@/hooks/use-client"
import useMutation from "@/hooks/use-mutation"

type Props = Pick<Required<ModalProps>, "open" | "setOpen">

const DeleteWishModal = ({ open, setOpen }: Props) => {
  const { t } = useTranslation()
  const { tw } = useTheme()
  const { selectedWish, removeWish } = useWishlist()

  const client = useClient()
  const { mutate: deleteWish, isPending } = useMutation(
    client.wish[":wishId"].$delete,
    {
      mutationKey: ["delete-wish"],
      onSuccess: ({ result: { id } }) => {
        removeWish(id)
        setOpen(false)
      },
    },
  )

  const handleDelete = () => {
    if (!selectedWish) {
      return
    }

    deleteWish({ param: { wishId: selectedWish.id.toString() } })
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <ModalContent style={tw.style("gap-3")}>
        <Text style={tw.style("text-center")} color="card-foreground">
          {t("forms.wish.delete.confirmation", { name: selectedWish?.name })}
        </Text>
        <View style={tw.style("flex-row justify-between gap-4")}>
          <ModalClose isText style={tw.style("flex-1")}>
            {t("forms.wish.delete.cancel")}
          </ModalClose>
          <Button
            color="danger"
            isText
            style={tw.style("flex-1")}
            isLoading={isPending}
            onPress={handleDelete}
          >
            {t("forms.wish.delete.submit")}
          </Button>
        </View>
      </ModalContent>
    </Modal>
  )
}

export default DeleteWishModal
