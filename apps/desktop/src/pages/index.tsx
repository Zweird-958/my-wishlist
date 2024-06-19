import { GetStaticPropsContext } from "next"
import { useTranslations } from "next-intl"

import AuthWishlist from "@my-wishlist/ui/user/AuthWishlist"

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    messages: (await import(`../../locales/${locale}.json`)).default,
  },
})

const Home = () => {
  const t = useTranslations("common")

  return (
    <>
      <p className="text-primary">test</p>
      <AuthWishlist
        header={t("notLogged")}
        body={t("mustLoggedIn")}
        button={t("signIn")}
      />
    </>
  )
}

export default Home
