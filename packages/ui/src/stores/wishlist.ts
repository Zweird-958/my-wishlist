import { create } from "zustand"

import config, { Filter, Sort } from "@my-wishlist/config"
import { Wish } from "@my-wishlist/types/Wish"

type WishlistStore = {
  wishlist: Wish[]
  setWishlist: (wishlist: Wish[]) => void
  addWish: (wish: Wish) => void
  removeWish: (wish: Wish) => void
  updateWish: (wish: Wish) => void
  selectedFilter: Filter
  setSelectedFilter: (filter: Filter) => void
  selectedSort: Sort
  setSelectedSort: (sort: Sort) => void
}

const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],
  setWishlist: (wishlist: Wish[]) => set({ wishlist }),
  addWish: (wish: Wish) =>
    set((state) => ({ wishlist: [...state.wishlist, wish] })),
  removeWish: (deletedWish: Wish) =>
    set((state) => ({
      wishlist: state.wishlist.filter((wish) => wish.id !== deletedWish.id),
    })),
  updateWish: (updatedWish: Wish) =>
    set((state) => ({
      wishlist: state.wishlist.map((wish) =>
        wish.id === updatedWish.id ? updatedWish : wish,
      ),
    })),
  selectedFilter: config.defaultFilter,
  setSelectedFilter: (selectedFilter: Filter) => set({ selectedFilter }),
  selectedSort: config.defaultSort,
  setSelectedSort: (selectedSort: Sort) => set({ selectedSort }),
}))

export default useWishlistStore
