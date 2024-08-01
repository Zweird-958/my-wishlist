"use client"

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react"
import { SquarePenIcon } from "lucide-react"

import type { Wish } from "@my-wishlist/types"

import { useTranslation } from "../AppContext"
import DeleteWish from "./DeleteWish"

type Props = {
  wish: Wish
  canEdit?: boolean
  onEditButton: (wish: Wish) => void
}

const WishCard = ({ wish, canEdit, onEditButton }: Props) => {
  const { image, name, link, priceFormatted } = wish
  const { t } = useTranslation()
  const handleEdit = () => onEditButton(wish)

  return (
    <Card isFooterBlurred className="w-wish h-wish">
      <CardHeader className="absolute top-0 z-20 justify-between">
        {canEdit && (
          <>
            <DeleteWish wish={wish} />
            <Button
              isIconOnly
              size="sm"
              className="px-2"
              color="warning"
              onPress={handleEdit}
            >
              <SquarePenIcon />
            </Button>
          </>
        )}
      </CardHeader>
      <div className="flex h-full w-full items-center justify-center">
        <Image
          isBlurred
          alt="Card background"
          className="z-10 h-96 w-full object-cover"
          radius="none"
          src={image}
        />
        <Image
          removeWrapper
          alt="Card background"
          className="absolute z-0 h-96 w-full blur-lg"
          radius="none"
          src={image}
        />
      </div>
      <CardFooter className="border-t-1 absolute bottom-0 z-20 justify-between border-zinc-100/50 bg-white/30">
        <div className="text-tiny basis-5/6 text-black">
          <p className="line-clamp-1">{name}</p>
          <p className="line-clamp-1">{priceFormatted}</p>
        </div>
        <Button
          as={Link}
          href={link}
          isExternal
          className="text-tiny"
          color="primary"
          size="sm"
        >
          {t("buy")}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default WishCard
