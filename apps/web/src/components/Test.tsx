"use client"

import { usePathname } from "next/navigation"

import { useTranslation } from "@/app/i18n/client"
import changeLocale from "@/utils/locale/changeLocale"

const TestClient = () => {
  const { t } = useTranslation()
  const path = usePathname()

  return (
    <div>
      <p>{path}</p>
      <h1>{t("hello", { name: "toi" })}</h1>
      <p>Test</p>
      <button
        onClick={async () => {
          await changeLocale("fr")
        }}
      >
        fr
      </button>
      <button
        onClick={async () => {
          await changeLocale("en")
        }}
      >
        /en
      </button>
    </div>
  )
}

export default TestClient
