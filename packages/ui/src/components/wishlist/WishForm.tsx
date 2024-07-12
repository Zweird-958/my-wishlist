"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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

import config from "@my-wishlist/config"
import { addWishSchema } from "@my-wishlist/schemas"
import { Currency, Wish } from "@my-wishlist/types"

import useCurrencies from "../../hooks/useCurrencies"
import useUploadImage from "../../hooks/useUploadImage"
import { useTranslation } from "../AppContext"
import CurrencyDropdown from "../CurrencyDropdown"
import Field from "../Field"
import SwitchField from "../SwitchField"
import WishSelectedImage from "./WishSelectedImage"

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

type WishBooleanInput = "purchased" | "isPrivate"

// eslint-disable-next-line complexity
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
  const { currencies } = useCurrencies()

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
  const handleSwitch = (field: WishBooleanInput) => (isSelected: boolean) => {
    setValue(field, isSelected)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col gap-3 items-center"
    >
      <Field control={control} name="name" label={t("name")} />
      <Field control={control} name="price" type="number" label={t("price")} />
      <Field control={control} name="url" type="url" label={t("url")} />
      <CurrencyDropdown
        onSelectionChange={handleChangeCurrency}
        currency={watch("currency")}
        currencies={currencies}
      />
      {SelectImageComponent}
      <WishSelectedImage wish={wish} image={image} />
      {wish && (
        <>
          <SwitchField
            label={t("purchased")}
            onValueChange={handleSwitch("purchased")}
            isSelected={watch("purchased")}
          />
          <SwitchField
            label={t("private")}
            onValueChange={handleSwitch("isPrivate")}
            isSelected={watch("isPrivate")}
          />
        </>
      )}
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
