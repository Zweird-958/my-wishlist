import { zodResolver } from "@hookform/resolvers/zod"
import { useFetch } from "@hyper-fetch/react"
import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
  type Selection,
} from "@nextui-org/react"
import { useForm } from "react-hook-form"

import { getCurrencies } from "@my-wishlist/api/routes/currencies"
import { addWishSchema } from "@my-wishlist/schemas"
import { Currency, Wish } from "@my-wishlist/types/Wish"

import { useTranslation } from "@/app/i18n/client"
import CurrencyDropdown from "@/components/CurrencyDropdown"
import FormField from "@/components/ui/FormField"
import WishSelectedImage from "@/components/wishlist/WishSelectedImage"
import useUploadImage from "@/hooks/useUploadImage"
import config from "@/utils/config"

type FormProps = {
  wish?: Wish
  submitText: string
  onSubmit: (data: FormData) => void
} & Pick<ButtonProps, "isLoading"> &
  Pick<ModalProps, "onClose">

type WishFormProps = {
  title: string
} & Pick<ModalProps, "isOpen" | "onOpenChange"> &
  FormProps

const Form = (props: FormProps) => {
  const { onSubmit, wish, isLoading, submitText, onClose } = props
  const { t } = useTranslation("forms")
  const { SelectImageComponent, image } = useUploadImage()
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: wish?.name ?? "",
      price: wish?.price ?? 0,
      currency: wish?.currency ?? config.defaultCurrency,
      url: wish?.link ?? "",
      purchased: wish?.purchased ?? false,
      isPrivate: wish?.isPrivate ?? false,
    },
    resolver: zodResolver(addWishSchema),
  })
  const { data: currencies } = useFetch(getCurrencies)

  const handleChangeCurrency = (keys: Selection) => {
    const currency = Array.from(keys)
      .join(", ")
      .replaceAll("_", " ") as Currency
    setValue("currency", currency)
  }

  const handleOnSubmit = handleSubmit((data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("currency", data.currency)
    formData.append("price", data.price.toString())
    formData.append("url", data.url)
    formData.append("purchased", data.purchased.toString())
    formData.append("isPrivate", data.isPrivate.toString())

    if (image) {
      formData.append("image", image)
    }

    onSubmit(formData)
  })

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col gap-3 items-center"
    >
      <FormField control={control} name="name" label={t("name")} />
      <FormField
        control={control}
        name="price"
        type="number"
        label={t("price")}
      />
      <FormField control={control} name="url" type="url" label={t("url")} />
      <CurrencyDropdown
        onSelectionChange={handleChangeCurrency}
        currency={watch("currency")}
        currencies={currencies?.result || []}
      />
      {SelectImageComponent}
      <WishSelectedImage wish={wish} image={image} />
      <div className="flex justify-between w-full">
        <Button type="button" color="danger" onPress={onClose}>
          {t("wish.cancel")}
        </Button>
        <Button type="submit" color="primary" isLoading={isLoading}>
          {submitText}
        </Button>
      </div>
    </form>
  )
}

const WishForm = (props: WishFormProps) => {
  const { isOpen, onOpenChange, title, ...formProps } = props

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
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <Form {...formProps} onClose={onClose} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default WishForm
