"use client"

import { Image, type ImageProps } from "@nextui-org/react"

import type { Wish } from "@my-wishlist/types"

type Props = {
  wish?: Wish
  image: File | null
}

const WishImage = ({ alt, ...props }: ImageProps) => (
  <Image className="h-72 w-72 object-cover" {...props} alt={alt} />
)

const WishSelectedImage = ({ wish, image }: Props) => {
  if (image) {
    return <WishImage src={URL.createObjectURL(image)} alt={image.name} />
  }

  if (wish?.image) {
    return <WishImage src={wish.image} alt={wish.name} />
  }

  return null
}

export default WishSelectedImage
