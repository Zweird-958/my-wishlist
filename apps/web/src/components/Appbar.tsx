"use client"

import { useTranslation } from "@my-wishlist/i18n"
import AppbarGeneric from "@my-wishlist/ui/Appbar"

import useSession from "@/hooks/useSession"

const Appbar = () => {
  const { t, changeLanguage } = useTranslation()
  const { session, signOut } = useSession()
  const menuItems = [
    { label: t("home"), href: "/" },
    { label: t("wishlistShared"), href: "/share", hidden: !session },
    { label: t("signIn"), href: "/sign-in", hidden: Boolean(session) },
    { label: t("signUp"), href: "/sign-up", hidden: Boolean(session) },
    { label: t("signOut"), onClick: signOut, hidden: !session },
  ]

  return (
    <AppbarGeneric
      actions={{
        changeLocale: changeLanguage,
        signOut,
      }}
      menuItems={menuItems}
      session={session}
    />
  )
}

export default Appbar
