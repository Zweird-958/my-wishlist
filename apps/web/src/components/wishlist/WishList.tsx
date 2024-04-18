import { Wish } from "@my-wishlist/types/Wish"

import WishCard from "@/components/wishlist/WishCard"

type Props = {
  wishes: Wish[]
}

const WishList = (props: Props) => {
  const { wishes } = props

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-4 justify-center ">
        {wishes.map((wish) => (
          <WishCard key={wish.id} wish={wish} canEdit />
        ))}
      </div>
    </div>
  )
}

export default WishList
