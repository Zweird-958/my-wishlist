import { create } from "zustand"

import { UserShared } from "@my-wishlist/types"

type UsersSharedStore = {
  usersShared: UserShared[]
  setUsersShared: (usersShared: UserShared[]) => void
  addUser: (user: UserShared) => void
  removeUser: (userId: number) => void
}
const useUsersSharedStore = create<UsersSharedStore>((set) => ({
  usersShared: [],
  setUsersShared: (usersShared: UserShared[]) => set({ usersShared }),
  addUser: (user: UserShared) =>
    set((state) => ({ usersShared: [...state.usersShared, user] })),
  removeUser: (userId: number) =>
    set((state) => ({
      usersShared: state.usersShared.filter((user) => user.id !== userId),
    })),
}))

export default useUsersSharedStore
