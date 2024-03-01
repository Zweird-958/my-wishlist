import { cookies } from "next/headers"
import { Locale } from "packages/config"

import { useTranslation } from "@/app/i18n"
import TestClient from "@/components/Test"
import config from "@/utils/config"

const Test = async () => {
  const lang = cookies().get(config.cookieLanguageKey)?.value
  const { t } = await useTranslation(lang as Locale)

  return (
    <div>
      <h1>{t("hello", { name: "bonjour" })}</h1>
      <p>Test</p>
      <TestClient />
    </div>
  )
}

export default Test
