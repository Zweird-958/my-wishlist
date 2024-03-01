"use client"

import { useTranslation } from "@/app/i18n/client"

const TestClient = () => {
  const { t } = useTranslation("fr")

  return (
    <div suppressHydrationWarning>
      <h1>{t("hello", { name: "toi" })}</h1>
      <p>Test</p>
      {/* <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>fr</strong> to:{" "}
      </Trans> */}
    </div>
  )
}

export default TestClient
