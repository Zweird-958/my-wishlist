import AsyncStorage from "@react-native-async-storage/async-storage"
import { getLocales } from "expo-localization"

import {
  languageSchema,
  languageSchemaFallback,
} from "@my-wishlist/i18n/config"

import config from "@/utils/config"

const getLocale = async () => {
  const lang = await AsyncStorage.getItem(config.store.language)

  return languageSchema
    .catch(() => {
      const [defaultLanguage] = getLocales()

      return languageSchemaFallback.parse(defaultLanguage?.languageCode)
    })
    .parse(lang)
}

export default getLocale
