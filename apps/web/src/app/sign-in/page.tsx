import type { Metadata } from "next"

import { getTranslation } from "@my-wishlist/i18n/server"
import { SignIn } from "@my-wishlist/ui"

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getTranslation()

  return {
    title: t("metadata.signIn.title"),
    description: t("metadata.signIn.description"),
  }
}

export default SignIn
