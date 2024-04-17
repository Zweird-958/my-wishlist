import { create } from "zustand"

import { Wish } from "@my-wishlist/types/Wish"

type WishlistStore = {
  wishlist: Wish[]
  setWishlist: (wishlist: Wish[]) => void
  addWish: (wish: Wish) => void
  removeWish: (wish: Wish) => void
  updateWish: (wish: Wish) => void
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
}))

export default useWishlistStore
