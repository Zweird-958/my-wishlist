import { Wish } from "@my-wishlist/types/Wish"

import WishCard from "./WishCard"

type Props = {
  wishes: Wish[]
}

const WishList = (props: Props) => {
  const { wishes } = props

  return (
    <div className="flex flex-wrap gap-4">
      {wishes.map((wish) => (
        <WishCard key={wish.id} wish={wish} />
      ))}
    </div>
  )
}

export default WishList
