import { ReactNode } from "react"

import { Wish } from "@my-wishlist/types/Wish"
import LoadingScreen from "@my-wishlist/ui/ui/LoadingScreen"

import WishList from "@/components/wishlist/WishList"
import WishlistEmpty from "@/components/wishlist/WishlistEmpty"
import WishlistOptions from "@/components/wishlist/WishlistOptions"
import { Filter, Sort } from "@/utils/config"
import filterWishlist from "@/utils/filterWishlist"

type Props = {
  isLoading?: boolean
  wishlist: Wish[]
  selectedFilter: Filter
  setSelectedFilter: (filter: Filter) => void
  selectedSort: Sort
  setSelectedSort: (sort: Sort) => void
  children?: ReactNode
}

const WishlistDisplay = ({
  isLoading,
  wishlist,
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  setSelectedSort,
  children,
}: Props) => {
  if (isLoading) {
    return <LoadingScreen />
  }

  if (wishlist.length === 0) {
    return <WishlistEmpty />
  }

  return (
    <>
      <div className="flex flex-col gap-4 max-w-wish mx-auto">
        <WishlistOptions
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
        <WishList
          wishes={filterWishlist(wishlist, selectedFilter, selectedSort)}
        />
      </div>
      {children}
    </>
  )
}

export default WishlistDisplay
