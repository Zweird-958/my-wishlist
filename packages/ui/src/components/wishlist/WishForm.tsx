"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  type ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps,
  type Selection,
} from "@nextui-org/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

import config from "@my-wishlist/config"
import {
  addWishSchema,
  currencySchema,
  wishFormSchema,
} from "@my-wishlist/schemas"
import type { Currency, Wish } from "@my-wishlist/types"

import useCurrencies from "../../hooks/useCurrencies"
import useQuery from "../../hooks/useQuery"
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

const formSchema = wishFormSchema.extend({
  currency: currencySchema.default(config.defaultCurrency),
})

const Form = (props: FormProps) => {
  const { currencies, setCurrencies } = useCurrencies()
  const { onSubmit, wish, isLoading, submitText, onClose } = props
  const { t } = useTranslation("forms")
  const { SelectImageComponent, image } = useUploadImage()
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: formSchema.parse({ ...wish }),
    resolver: zodResolver(addWishSchema),
  })

  const { data } = useQuery<Currency[]>({
    method: "get",
    path: "/currency",
    enabled: currencies.length === 0,
    queryKey: ["currencies"],
  })

  useEffect(() => {
    if (data) {
      setCurrencies(data.result)
    }
  }, [data, setCurrencies])

  const handleChangeCurrency = (keys: Selection) => {
    const currency = Array.from(keys)
      .join(", ")
      .replaceAll("_", " ") as Currency
    setValue("currency", currency)
  }

  const handleOnSubmit = handleSubmit(
    ({ name, currency, price, url, purchased, isPrivate }) => {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("currency", currency)
      formData.append("price", price.toString())
      formData.append("url", url)
      formData.append("purchased", purchased.toString())
      formData.append("isPrivate", isPrivate.toString())

      if (image) {
        formData.append("image", image)
      }

      onSubmit(formData)
    },
  )
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
