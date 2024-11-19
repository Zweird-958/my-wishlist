"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type ButtonProps } from "@nextui-org/react"
import { Button } from "@ui/components/ui/button"
import { Form, FormInput, FormSelect } from "@ui/components/ui/form"
import { useForm } from "react-hook-form"

import config from "@my-wishlist/config"
import {
  addWishSchema,
  currencySchema,
  wishFormSchema,
} from "@my-wishlist/schemas"
import type { AddWishSchema, Wish } from "@my-wishlist/types"

import { useCurrencies } from "../../contexts/currencies-context"
import useUploadImage from "../../hooks/useUploadImage"
import { useTranslation } from "../AppContext"
import SwitchField from "../SwitchField"
import WishSelectedImage from "./WishSelectedImage"
import WishImageInput from "./wish-image-input"

type Props = {
  wish?: Wish
  submitText: string
  onSubmit: (data: AddWishSchema) => void
  onClose: () => void
} & Pick<ButtonProps, "isLoading">

type WishBooleanInput = "isPrivate"

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
  const { currencies } = useCurrencies()
  const { addImageMutate, image, setImage, imageIsLoading } = useUploadImage()
  const { t } = useTranslation("forms")
  const form = useForm({
    defaultValues: formSchema.parse({ ...wish }),
    resolver: zodResolver(addWishSchema),
  })

  const handleOnSubmit = form.handleSubmit((values) => {
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
    form.setValue(field, isSelected)
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={handleOnSubmit}
        className="flex flex-col items-center gap-3"
      >
        <FormInput name="name" label={t("name")} />
        <FormInput name="price" type="number" label={t("price")} />
        <FormInput name="link" type="url" label={t("url")} />
        <FormSelect
          name="currency"
          options={currencies}
          triggerProps={{
            classNames: { icon: "absolute right-2", trigger: "justify-center" },
          }}
          itemProps={{ className: "justify-center px-2" }}
        />
        <WishImageInput image={image} setImage={setImage} />
        <WishSelectedImage wish={wish} image={image} />
        <SwitchField
          label={t("private")}
          onValueChange={handleSwitch("isPrivate")}
          isSelected={form.watch("isPrivate")}
        />
        <div className="flex w-full justify-between">
          <Button type="button" color="danger" onClick={onClose}>
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
    </Form>
  )
}

export default WishForm
