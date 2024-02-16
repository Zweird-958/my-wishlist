import { Image } from "@nextui-org/react"

import config from "@my-wishlist/config"

type Props = {
  language: string
}

const Flag = (props: Props) => {
  const { language } = props

  return (
    <Image
      src={config.flagUrl(language)}
      alt={language}
      width={18}
      height={18}
      radius="sm"
    />
  )
}

export default Flag
