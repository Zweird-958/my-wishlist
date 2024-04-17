"use client"

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
  useDisclosure,
} from "@nextui-org/react"
import { SquarePenIcon, Trash2Icon } from "lucide-react"

import type { Wish } from "@my-wishlist/types/Wish"

import { useTranslation } from "@/app/i18n/client"
import EditWishForm from "@/components/wishlist/EditWishForm"

type Props = {
  wish: Wish
  canEdit?: boolean
}

const WishCard = ({ wish, canEdit }: Props) => {
  const { image, name, link } = wish
  const { isOpen, onOpenChange } = useDisclosure()
  const { t } = useTranslation()

  return (
    <>
      {canEdit && (
        <EditWishForm wish={wish} isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
      <Card isFooterBlurred className="w-80 h-80">
        <CardHeader className="absolute top-0 z-20 justify-between">
          {canEdit && (
            <>
              <Button isIconOnly size="sm" className="px-2" color="danger">
                <Trash2Icon />
              </Button>
              <Button
                isIconOnly
                size="sm"
                className="px-2"
                color="warning"
                onPress={onOpenChange}
              >
                <SquarePenIcon />
              </Button>
            </>
          )}
        </CardHeader>
        <div className="flex justify-center items-center h-full w-full">
          <Image
            isBlurred
            alt="Card background"
            className="h-96 w-full object-cover z-10"
            radius="none"
            src={image}
          />
          <Image
            removeWrapper
            alt="Card background"
            className="h-96 w-full z-0 absolute blur-lg"
            radius="none"
            src={image}
          />
        </div>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-20 justify-between">
          <p className="text-black text-tiny basis-5/6 line-clamp-2">{name}</p>
          <Button
            as={Link}
            href={link}
            target="_blank"
            className="text-tiny"
            color="primary"
            size="sm"
          >
            {t("buy")}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default WishCard
