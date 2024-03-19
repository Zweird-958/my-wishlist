"use client"

import { useTranslation } from "@/app/i18n/client"
import { useLocale } from "@/app/i18n/provider"

const TestClient = () => {
  const { t } = useTranslation()
  const test = useLocale()

  return (
    <div>
      <p>{test}</p>
      <h1>{t("hello", { name: "toi" })}</h1>
    </div>
  )
}

export default TestClient
