"use client"

import type { ReactNode } from "react"

import type { Filter, Sort } from "@my-wishlist/config"
import type { Wish } from "@my-wishlist/types"

import filterWishlist from "../../utils/filterWishlist"
import LoadingScreen from "../LoadingScreen"
import WishList from "./WishList"
import WishlistEmpty from "./WishlistEmpty"
import WishlistOptions from "./WishlistOptions"

type Props = {
  isLoading?: boolean
  wishlist: Wish[]
  selectedFilter: Filter
  setSelectedFilter: (filter: Filter) => void
  selectedSort: Sort
  setSelectedSort: (sort: Sort) => void
  username?: string
  canEdit?: boolean
  children?: ReactNode
}

const WishlistDisplay = ({
  isLoading,
  wishlist,
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  setSelectedSort,
  username,
  canEdit,
  children,
}: Props) => {
  if (isLoading) {
    return <LoadingScreen />
  }

  if (wishlist.length === 0) {
    return <WishlistEmpty username={username} />
  }

  return (
    <>
      <div className="max-w-wish mx-auto flex w-full flex-col gap-4">
        <WishlistOptions
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
        <WishList
          wishes={filterWishlist(wishlist, selectedFilter, selectedSort)}
          canEdit={canEdit}
        />
      </div>
      {children}
    </>
  )
}

export default WishlistDisplay
