"use client"

import { Button } from "@ui/components/ui/button"
import { Card, CardFooter, CardHeader } from "@ui/components/ui/card"
import { Skeleton } from "@ui/components/ui/skeleton"
import WishImage from "@ui/components/wishlist/wish-image"
import { SquarePenIcon } from "lucide-react"
import Link from "next/link"

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
    <Card className="w-wish h-wish relative">
      <CardHeader className="absolute top-0 z-20 w-full justify-between">
        {canEdit && (
          <>
            <DeleteWish wish={wish} />
            <Button
              size="icon"
              className="px-2"
              color="warning"
              onClick={handleEdit}
            >
              <SquarePenIcon />
            </Button>
          </>
        )}
      </CardHeader>
      <div className="flex h-full w-full items-center justify-center">
        {image ? (
          <WishImage src={image} alt={name} />
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </div>
      <CardFooter
        className="border-t-1 absolute bottom-0 z-20 justify-between bg-white/20"
        isBlurred
      >
        <div className="text-tiny basis-5/6 text-black">
          <p className="line-clamp-1">{name}</p>
          <p className="line-clamp-1">{priceFormatted}</p>
        </div>
        {link && (
          <Button className="text-xs" color="primary" size="sm" asChild>
            <Link href={link} target="_blank">
              {t("buy")}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default WishCard
