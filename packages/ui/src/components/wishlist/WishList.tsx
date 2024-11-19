import { useDialog } from "@ui/components/ui/dialog"
import { useState } from "react"

import type { Wish } from "@my-wishlist/types"

import EditWishForm from "./EditWishForm"
import WishCard from "./WishCard"

type Props = {
  wishes: Wish[]
  canEdit?: boolean
}

const WishList = ({ wishes, canEdit }: Props) => {
  const { open, onOpenChange, onOpen } = useDialog()
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)
  const handleEdit = (wish: Wish) => {
    onOpen()
    setSelectedWish(wish)
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-4">
        {selectedWish && (
          <EditWishForm
            wish={selectedWish}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
        {wishes.map((wish) => (
          <WishCard
            key={`wish-${wish.id}`}
            wish={wish}
            canEdit={canEdit}
            onEditButton={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default WishList
