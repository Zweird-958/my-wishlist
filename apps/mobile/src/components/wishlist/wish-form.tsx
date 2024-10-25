import { zodResolver } from "@hookform/resolvers/zod"
import * as FileSystem from "expo-file-system"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { SafeAreaView, View } from "react-native"

import config from "@my-wishlist/config"
import {
  addWishSchema,
  currencySchema,
  priceSchema,
  wishFormSchema,
} from "@my-wishlist/schemas"
import type { AddWishSchema, Currency, Wish } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useCurrencies } from "@/components/contexts/currencies-context"
import { Button } from "@/components/ui/button"
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  type Item,
} from "@/components/ui/dropdown"
import FormField from "@/components/ui/input/form-field"
import { Text } from "@/components/ui/text"
import WishImage from "@/components/wishlist/wish-image"
import useImage from "@/hooks/use-image"

type Props = {
  wish?: Wish
  onSubmit: (data: AddWishSchema) => void
  isLoading: boolean
}

const formSchema = wishFormSchema.extend({
  currency: currencySchema.default(config.defaultCurrency),
  price: priceSchema.default(1).transform((value) => value.toString()),
})

// eslint-disable-next-line max-lines-per-function
const WishForm = ({ wish, onSubmit, isLoading }: Props) => {
  const { tw } = useTheme()
  const { t } = useTranslation()
  const { currencies } = useCurrencies()
  const {
    pickImage,
    image: imageSelected,
    uploadImage,
    isLoading: imageIsLoading,
  } = useImage()
  const image = useMemo(() => {
    if (imageSelected) {
      return imageSelected
    }

    if (wish?.image) {
      return { uri: wish.image }
    }

    return null
  }, [imageSelected, wish?.image])

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: formSchema.parse(
      wish ?? { currency: config.defaultCurrency },
    ),
    resolver: zodResolver(addWishSchema),
  })

  const handleOnChange = (item: Item) => {
    setValue("currency", item.value as Currency)
  }

  const handleOnSubmit = handleSubmit(
    async ({ price: priceString, ...values }) => {
      const price = parseFloat(priceString)

      if (imageSelected) {
        const data = {
          uri: await FileSystem.readAsStringAsync(imageSelected.uri, {
            encoding: "base64",
          }),
          type: "image/jpg",
        }

        uploadImage(
          { image: data },
          {
            onSuccess: ({ result }) =>
              onSubmit({ ...values, price, image: result }),
          },
        )

        return
      }

      onSubmit({ ...values, price })
    },
  )

  return (
    <SafeAreaView style={tw.style("flex-1 gap-4")}>
      <Text style={tw.style("mt-4 text-lg font-semibold text-center")}>
        {t("forms.wish.add.title")}
      </Text>
      <FormField
        control={control}
        name="name"
        label={t("forms.name.label")}
        placeholder={t("forms.name.placeholder")}
      />
      <FormField
        control={control}
        name="price"
        keyboardType="number-pad"
        label={t("forms.price.label")}
        placeholder={t("forms.price.placeholder")}
      />
      <FormField
        control={control}
        name="link"
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
        label={t("forms.url.label")}
        placeholder={t("forms.url.placeholder")}
      />
      <Dropdown onChange={handleOnChange}>
        <DropdownTrigger isText>{watch("currency")}</DropdownTrigger>
        <DropdownContent>
          {currencies.map((currency) => (
            <DropdownItem
              key={currency}
              value={currency}
              label={currency}
              closeOnPress
            />
          ))}
        </DropdownContent>
      </Dropdown>
      <Button onPress={pickImage} isText>
        {t("forms.image")}
      </Button>
      {image && (
        <View style={tw.style("size-48 rounded-md mx-auto")}>
          <WishImage image={image.uri} />
        </View>
      )}
      <Button
        onPress={handleOnSubmit}
        isLoading={isLoading || imageIsLoading}
        isText
      >
        {t("forms.wish.add.submit")}
      </Button>
    </SafeAreaView>
  )
}

export default WishForm
