import { useTranslation } from "react-i18next"

import { Text } from "@/components/ui/text"

type Props = {
  label: string
}

const HeaderTitle = ({ label }: Props) => {
  const { t } = useTranslation()

  return <Text color="card-foreground">{t(`layout.header.${label}`)}</Text>
}

export default HeaderTitle
