import { create } from "zustand"

import { Wish } from "@my-wishlist/types/Wish"

type WishlistStore = {
  wishlist: Wish[]
  setWishlist: (wishlist: Wish[]) => void
  addWish: (wish: Wish) => void
  removeWish: (wish: Wish) => void
}

const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],
  setWishlist: (wishlist: Wish[]) => set({ wishlist }),
  addWish: (wish: Wish) =>
    set((state) => ({ wishlist: [...state.wishlist, wish] })),
  removeWish: (wish: Wish) =>
    set((state) => ({
      wishlist: state.wishlist.filter((w) => w.id !== wish.id),
    })),
}))

export default useWishlistStore
