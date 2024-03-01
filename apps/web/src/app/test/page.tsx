import { useTranslation } from "@/app/i18n"
import TestClient from "@/components/Test"

const Test = async () => {
  const { t } = await useTranslation("common")

  return (
    <div>
      <h1>{t("hello", { name: "bonjour" })}</h1>
      <p>{t("test")}</p>
      <TestClient />
    </div>
  )
}

export default Test
