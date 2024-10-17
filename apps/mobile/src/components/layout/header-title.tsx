import type { TOptionsBase } from "i18next"
import type { $Dictionary } from "node_modules/i18next/typescript/helpers"
import { useTranslation } from "react-i18next"

import { Text } from "@/components/ui/text"

type Props = {
  label: string
  options?: TOptionsBase & $Dictionary
}

const HeaderTitle = ({ label, options }: Props) => {
  const { t } = useTranslation()

  return (
    <Text color="card-foreground">{t(`layout.header.${label}`, options)}</Text>
  )
}

export default HeaderTitle
