import { useDisclosure } from "@nextui-org/react"
import { useState } from "react"

import { Wish } from "@my-wishlist/types/Wish"

import EditWishForm from "./EditWishForm"
import WishCard from "./WishCard"

type Props = {
  wishes: Wish[]
}

const WishList = (props: Props) => {
  const { wishes } = props
  const { isOpen, onOpenChange } = useDisclosure()
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)
  const handleEdit = (wish: Wish) => {
    onOpenChange()
    setSelectedWish(wish)
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-4 justify-center ">
        {selectedWish && (
          <EditWishForm
            wish={selectedWish}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}
        {wishes.map((wish) => (
          <WishCard
            key={wish.id}
            wish={wish}
            canEdit
            onEditButton={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default WishList
