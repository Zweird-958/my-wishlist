import { Locale, useTranslation } from "@my-wishlist/i18n/desktop"
import AppbarGeneric from "@my-wishlist/ui/Appbar"

import config from "@/utils/config"
import store from "@/utils/store"

const Appbar = () => {
  const { changeLanguage } = useTranslation()

  const handleChangeLocale = async (newLocale: Locale) => {
    changeLanguage(newLocale)
    await store.set(config.store.localeKey, newLocale)
    await store.save()
  }

  return (
    <AppbarGeneric
      actions={{
        changeLocale: handleChangeLocale,
      }}
    />
  )
}

export default Appbar
