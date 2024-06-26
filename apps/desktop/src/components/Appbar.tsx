import { Locale, useTranslation } from "@my-wishlist/i18n/desktop"
import AppbarGeneric from "@my-wishlist/ui/Appbar"

import useSession from "@/hooks/useSession"
import config from "@/utils/config"
import store from "@/utils/store"

const Appbar = () => {
  const { session, signOut } = useSession()
  const { t, changeLanguage } = useTranslation()
  const menuItems = [
    { label: t("home"), href: "/" },
    { label: t("wishlistShared"), href: "/share", hidden: !session },
    { label: t("signIn"), href: "/sign-in", hidden: Boolean(session) },
    { label: t("signUp"), href: "/sign-up", hidden: Boolean(session) },
    { label: t("signOut"), onClick: signOut, hidden: !session },
  ]

  const handleChangeLocale = async (newLocale: Locale) => {
    changeLanguage(newLocale)
    await store.set(config.store.localeKey, newLocale)
    await store.save()
  }

  return (
    <AppbarGeneric
      actions={{
        changeLocale: handleChangeLocale,
        signOut,
      }}
      menuItems={menuItems}
      session={session}
    />
  )
}

export default Appbar
