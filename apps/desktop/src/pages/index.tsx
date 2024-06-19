import { GetStaticPropsContext } from "next"
import { useTranslations } from "next-intl"

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    messages: (await import(`../../locales/${locale}.json`)).default,
  },
})

const Home = () => {
  const t = useTranslations("common")

  return <p>{t("hello")}</p>
}

export default Home
