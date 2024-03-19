"use client"

import { useTranslation } from "@/app/i18n/client"
import { useLocale } from "@/app/i18n/provider"

const TestClient = () => {
  const { t } = useTranslation("zodErrors")
  const test = useLocale()
  const test2 = (field: string, error: string) =>
    t(`zodErrors:${field}.${error}`)

  return (
    <div>
      <p>{test}</p>
      <p>{test2("email", "required")}</p>

      <h1>{t("hello", { name: "toi" })}</h1>
    </div>
  )
}

export default TestClient
