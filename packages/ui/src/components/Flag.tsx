import { Image } from "@ui/components/ui/image"

import { config } from "@my-wishlist/i18n/config"

type Props = {
  language: string
}

const Flag = (props: Props) => {
  const { language } = props

  return (
    <Image src={config.flagUrl(language)} alt={language} className="size-5" />
  )
}

export default Flag
