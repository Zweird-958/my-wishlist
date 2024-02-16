import { Wish } from "@my-wishlist/types/Wish"

import WishCard from "./WishCard"

type Props = {
  wishes: Wish[]
}

const WishList = (props: Props) => {
  const { wishes } = props

  return (
    <div className="px-4 flex justify-center py-2 md:px-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {wishes.map((wish) => (
          <WishCard key={wish.id} wish={wish} />
        ))}
      </div>
    </div>
  )
}

export default WishList
