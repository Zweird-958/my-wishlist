import AppbarGeneric from "@my-wishlist/ui/Appbar"

import useSession from "@/hooks/useSession"
import useTranslation from "@/hooks/useTranslation"

const Appbar = () => {
  const {
    t: { common },
    locale,
    changeLocale,
  } = useTranslation()
  const { session, signOut } = useSession()
  const menuItems = [
    { label: common.home, href: "/" },
    { label: common.wishlistShared, href: "/share", hidden: !session },
    { label: common.signIn, href: "/sign-in", hidden: Boolean(session) },
    { label: common.signUp, href: "/sign-up", hidden: Boolean(session) },
    { label: common.signOut, onClick: signOut, hidden: !session },
  ]

  return (
    <AppbarGeneric
      locale={locale}
      translations={{
        dark: common.theme.dark,
        light: common.theme.light,
        system: common.theme.system,
        signIn: common.signIn,
        signOut: common.signOut,
        signUp: common.signUp,
      }}
      actions={{
        changeLocale,
        signOut,
      }}
      menuItems={menuItems}
      session={session}
    />
  )
}

export default Appbar
