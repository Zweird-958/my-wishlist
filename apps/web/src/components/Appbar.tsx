"use client"

import { useTranslation } from "@my-wishlist/i18n"
import AppbarGeneric from "@my-wishlist/ui/Appbar"

const Appbar = () => {
  const { changeLanguage } = useTranslation()

  return (
    <AppbarGeneric
      actions={{
        changeLocale: changeLanguage,
      }}
    />
  )
}

export default Appbar
