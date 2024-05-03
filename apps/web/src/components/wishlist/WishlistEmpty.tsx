"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/react"
import clsx from "clsx"

import Center from "@my-wishlist/ui/ui/Center"

import { useTranslation } from "@/app/i18n/client"

type Props = {
  username?: string
}

const WishlistEmpty = ({ username }: Props) => {
  const { t } = useTranslation()

  return (
    <Center>
      <Card className="max-w-lg w-full">
        <CardHeader className={clsx({ "justify-center py-4": username })}>
          {username ? t("sharedEmpty", { username }) : t("empty")}
        </CardHeader>
        {!username && (
          <CardBody>
            <p>{t("howToAdd")}</p>
          </CardBody>
        )}
      </Card>
    </Center>
  )
}

export default WishlistEmpty
