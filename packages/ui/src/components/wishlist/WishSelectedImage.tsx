"use client"

import WishImage from "@ui/components/wishlist/wish-image"

import type { Wish } from "@my-wishlist/types"

type Props = {
  wish?: Wish
  image: File | null
}

const WishSelectedImage = ({ wish, image }: Props) => {
  if (image) {
    return (
      <div className="relative h-72 w-72">
        <WishImage src={URL.createObjectURL(image)} alt={image.name} />
      </div>
    )
  }

  if (wish?.image) {
    return (
      <div className="relative h-72 w-72">
        <WishImage src={wish.image} alt={wish.name} />
      </div>
    )
  }

  return null
}

export default WishSelectedImage
