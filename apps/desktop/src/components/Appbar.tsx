import { setCookie } from "cookies-next"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"

import { Locale } from "@my-wishlist/i18n"
import AppbarGeneric from "@my-wishlist/ui/Appbar"

import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"
import config from "@/utils/config"

const Appbar = () => {
  const t = useTranslations("common")
  const locale = useLocale()
  const router = useRouter()
  const { session, signOut } = useSession()
  const menuItems = [
    { label: t("home"), href: "/" },
    { label: t("wishlistShared"), href: "/share", hidden: !session },
    { label: t("signIn"), href: "/sign-in", hidden: Boolean(session) },
    { label: t("signUp"), href: "/sign-up", hidden: Boolean(session) },
    { label: t("signOut"), onClick: signOut, hidden: !session },
  ]
  const handleChangeLocale = (currentLocale: Locale) => {
    setCookie(config.languageCookieKey, currentLocale)
    router.reload()
  }

  return (
    <AppbarGeneric
      locale={locale}
      translations={{
        dark: t("theme.dark"),
        light: t("theme.light"),
        system: t("theme.system"),
        signIn: t("signIn"),
        signOut: t("signOut"),
        signUp: t("signUp"),
      }}
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
