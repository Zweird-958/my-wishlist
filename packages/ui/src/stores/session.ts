import { create } from "zustand"

import { JwtPayload } from "@my-wishlist/types/Api"

type SessionStore = {
  session: JwtPayload | null
  setSession: (session: JwtPayload | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}
const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session: JwtPayload | null) => set({ session }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))

export default useSessionStore
