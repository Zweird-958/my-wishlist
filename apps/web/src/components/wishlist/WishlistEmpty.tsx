import { Card, CardBody, CardHeader } from "@nextui-org/react"

import Center from "@my-wishlist/ui/ui/Center"

import { useTranslation } from "@/app/i18n/client"

const WishlistEmpty = () => {
  const { t } = useTranslation()

  return (
    <Center>
      <Card className="max-w-lg w-full">
        <CardHeader>{t("empty")}</CardHeader>
        <CardBody>
          <p>{t("howToAdd")}</p>
        </CardBody>
      </Card>
    </Center>
  )
}

export default WishlistEmpty
