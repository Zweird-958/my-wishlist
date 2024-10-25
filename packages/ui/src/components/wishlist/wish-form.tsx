"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  type ButtonProps,
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
import type { AddWishSchema, Currency, Wish } from "@my-wishlist/types"

import useCurrencies from "../../hooks/useCurrencies"
import useQuery from "../../hooks/useQuery"
import useUploadImage from "../../hooks/useUploadImage"
import { useTranslation } from "../AppContext"
import CurrencyDropdown from "../CurrencyDropdown"
import Field from "../Field"
import SwitchField from "../SwitchField"
import WishSelectedImage from "./WishSelectedImage"
import WishImageInput from "./wish-image-input"

type Props = {
  wish?: Wish
  submitText: string
  onSubmit: (data: AddWishSchema) => void
} & Pick<ButtonProps, "isLoading"> &
  Pick<ModalProps, "onClose">

type WishBooleanInput = "purchased" | "isPrivate"

const formSchema = wishFormSchema.extend({
  currency: currencySchema.default(config.defaultCurrency),
})

const WishForm = ({
  onSubmit,
  wish,
  isLoading,
  submitText,
  onClose,
}: Props) => {
  const { currencies, setCurrencies } = useCurrencies()
  const { addImageMutate, image, setImage, imageIsLoading } = useUploadImage()
  const { t } = useTranslation("forms")
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

  const handleOnSubmit = handleSubmit((values) => {
    if (image) {
      const formData = new FormData()
      formData.append("image", image)

      addImageMutate(formData, {
        onSuccess: ({ result }) => onSubmit({ ...values, image: result }),
      })

      return
    }

    onSubmit(values)
  })
  const handleSwitch = (field: WishBooleanInput) => (isSelected: boolean) => {
    setValue(field, isSelected)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col items-center gap-3"
    >
      <Field control={control} name="name" label={t("name")} />
      <Field control={control} name="price" type="number" label={t("price")} />
      <Field control={control} name="link" type="url" label={t("url")} />
      <CurrencyDropdown
        onSelectionChange={handleChangeCurrency}
        currency={watch("currency")}
        currencies={currencies}
      />
      <WishImageInput image={image} setImage={setImage} />
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
      <div className="flex w-full justify-between">
        <Button type="button" color="danger" onPress={onClose}>
          {t("wish.cancel")}
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={imageIsLoading || isLoading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  )
}

export default WishForm
