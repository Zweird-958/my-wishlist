import type { Metadata } from "next"

import { getTranslation } from "@my-wishlist/i18n/server"
import { SignUp } from "@my-wishlist/ui"

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getTranslation()

  return {
    title: t("metadata.signUp.title"),
    description: t("metadata.signUp.description"),
  }
}

export default SignUp
