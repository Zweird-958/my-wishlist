"use client"

import { ReactNode } from "react"

import { Filter, Sort } from "@my-wishlist/config"
import { Wish } from "@my-wishlist/types/Wish"

import { SessionProps } from "../../types/session"
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
  children?: ReactNode
} & SessionProps

const WishlistDisplay = ({
  isLoading,
  wishlist,
  selectedFilter,
  setSelectedFilter,
  selectedSort,
  setSelectedSort,
  username,
  children,
  session,
}: Props) => {
  if (isLoading) {
    return <LoadingScreen />
  }

  if (wishlist.length === 0) {
    return <WishlistEmpty username={username} />
  }

  return (
    <>
      <div className="flex flex-col gap-4 max-w-wish mx-auto w-full">
        <WishlistOptions
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
        <WishList
          wishes={filterWishlist(wishlist, selectedFilter, selectedSort)}
          session={session}
        />
      </div>
      {children}
    </>
  )
}

export default WishlistDisplay
