import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { SafeAreaView, View } from "react-native"
import type { z } from "zod"

import config from "@my-wishlist/config"
import { addWishSchema } from "@my-wishlist/schemas"
import type { Currency, Wish } from "@my-wishlist/types"

import { useTheme } from "@/components/contexts/ThemeContext"
import { useWishlist } from "@/components/contexts/WishlistContext"
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
import api from "@/utils/api"

type CreateWishData = Omit<z.infer<typeof addWishSchema>, "price"> & {
  price: string
}

const CreateWish = () => {
  const { tw } = useTheme()
  const { t } = useTranslation()
  const { currencies } = useCurrencies()
  const { addWish } = useWishlist()
  const router = useRouter()

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      price: "",
      url: "",
      currency: config.defaultCurrency,
      isPrivate: false,
      purchased: false,
    },
    resolver: zodResolver(addWishSchema),
  })

  const handleOnChange = (item: Item) => {
    setValue("currency", item.value as Currency)
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["addWish"],
    mutationFn: (data: FormData) => api.post<Wish>("/wish", data),
    onSuccess: ({ result }) => {
      addWish(result)
      router.back()
    },
  })

  const onSubmit = ({
    name,
    currency,
    price,
    url,
    purchased,
    isPrivate,
  }: CreateWishData) => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("currency", currency)
    formData.append("price", price.toString())
    formData.append("url", url)
    formData.append("purchased", purchased.toString())
    formData.append("isPrivate", isPrivate.toString())

    mutate(formData)
  }

  const { pickImage, image } = useImage()

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
        name="url"
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
      <Button onPress={handleSubmit(onSubmit)} isLoading={isPending} isText>
        {t("forms.wish.add.submit")}
      </Button>
    </SafeAreaView>
  )
}

export default CreateWish
