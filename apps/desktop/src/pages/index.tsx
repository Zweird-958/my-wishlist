import { useTranslations } from "next-intl"

import AuthWishlist from "@my-wishlist/ui/user/AuthWishlist"

const Home = () => {
  const t = useTranslations("common")

  return (
    <AuthWishlist
      header={t("notLogged")}
      body={t("mustLoggedIn")}
      button={t("signIn")}
    />
  )
}

export default Home
